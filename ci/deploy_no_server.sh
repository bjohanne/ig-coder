#!/bin/bash
cd ig-coder
git pull

# This version of deploy.sh skips creating the server.

# Cleanup
rm -rf /var/www/app
# Re-create directory structure on the web-root
mkdir -p /var/www/app
mkdir -p /var/www/app/server
mkdir -p /var/www/app/client

# Generate nginx config file to sites-enabled folder
set -e
echo "client_max_body_size 0;" > /etc/nginx/conf.d/upload.conf

# Generate Nginx config
echo "server {
         listen 80;

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
npm run prebuild:prod
npm run build:prod
cp -a /home/ubuntu/ig-coder/client/build/. /var/www/app/client -rf

# Restart services
systemctl restart nginx
echo 'Deployment done!\r\r\r'
