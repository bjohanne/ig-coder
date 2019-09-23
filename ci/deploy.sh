#! /usr/bin/env bash
cd ig-coder
git pull
cd ..

# Ensure directory structure on the web-root
mkdir -p /var/www/app
mkdir -p /var/www/app/server
mkdir -p /var/www/app/client

# Install python deps , might be some new?
source igcoderenv/bin/activate
pip3 install --no-cache-dir -r ig-coder/server/requirements.txt
deactivate

# Copy app files from the repository folder to where it will run
cp -a ig-coder/server/* /var/www/app/server/ -rf
cp ig-coder/server/igcoder.service /etc/systemd/system/igcoder.service -rf

# Generate nginx config file to sites-enabled folder
set -e
echo "client_max_body_size 0;" > /etc/nginx/conf.d/upload.conf
# Generate Nginx config
echo "server {
         listen 80 default_server;
         location / {
             include uwsgi_params;
             uwsgi_pass  unix:/var/www/app/server/igcoder.sock;
         }

         location /igcoder {
             alias /var/www/app/client/;
         }
      }" > /etc/nginx/sites-enabled/igcoder
exec "$@"

chmod -R 777 /var/www/app/.*

# Start build for the client app
cd /home/ubuntu/ig-coder/client
npm install
npm run build
cp -a /home/ubuntu/ig-coder/client/build/. /var/www/app/client -rf

# Restart services
systemctl daemon-reload
systemctl restart igcoder.service
systemctl restart nginx
echo 'Deployment done!\r\r\r'