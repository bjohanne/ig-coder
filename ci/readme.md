# Deployment

The script deploy.sh will pull master after username/password prompt.
It will install dependencies, build and deploy the client and server component.

An existing repository under /home/ubuntu is required.

Run the script from the home folder.

The server component runs in uWSGI (currently in 5 worker threads) with nginx as reverse proxy.

## Relevant files for the setup

* server/uwsgi.ini - the ini file for wsgi
* server/igcoder.service - systemd unit file
* server/wsgi.py - app entrypoint when running under other than dev, imports app from app.py and runs it.