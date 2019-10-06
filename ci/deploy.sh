#!/bin/bash
cd ig-coder
git pull

# Cleanup
rm -rf /var/www/app
# Re-create directory structure on the web-root
mkdir -p /var/www/app
mkdir -p /var/www/app/server
mkdir -p /var/www/app/client

# Install virtual environment for igcoder
python3 -m venv /var/www/app/server/igcoderenv

# Activate our new environment
. /var/www/app/server/igcoderenv/bin/activate

# Verify that we're on the correct venv
python3 -m pip --version

# Install python deps
pip3 install wheel
pip3 install --no-cache-dir -r server/requirements.txt
pip3 install uwsgi
deactivate

# Copy app files from the repository folder to where it will run
cp -a server/* /var/www/app/server/ -rf
cp server/wsgi.py /var/www/app/wsgi.py -rf
cp server/igcoder.service /etc/systemd/system/igcoder.service -rf

# Generate nginx config file to sites-enabled folder
set -e
echo "client_max_body_size 0;" > /etc/nginx/conf.d/upload.conf
# Generate Nginx config
echo "server {
         listen 80;
         location /server {
             include uwsgi_params;
             uwsgi_pass  unix:/var/www/app/igcoder.sock;
         }

         location / {
             alias /var/www/app/client/;
             try_files \$uri \$uri/ /index.html;
         }
      }" > /etc/nginx/sites-enabled/igcoder
exec "$@"

chmod -R 777 /var/www/app/.*

# Start build for the client app
cd client
npm install
npm run build:test
cp -a /home/ubuntu/ig-coder/client/build/. /var/www/app/client -rf

# Restart services
systemctl daemon-reload
systemctl restart igcoder.service
systemctl restart nginx
echo 'Deployment done!\r\r\r'