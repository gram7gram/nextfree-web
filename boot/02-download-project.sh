#!/bin/bash

cd /var/www

git clone https://github.com/gram7gram/nextfree-web --depth=1 --branch=master

cd /var/www/nextfree-web

cp docker-compose.yml.dist docker-compose.yml \
 && cp api/parameters.js.dist api/parameters.js \
 && cp api/env/Dockerfile.dist api/env/Dockerfile \
 && cp owner/src/parameters.js.dist owner/src/parameters.js \
 && cp owner/env/Dockerfile.dist owner/env/Dockerfile \
 && cp staff/src/parameters.js.dist staff/src/parameters.js \
 && cp staff/env/Dockerfile.dist staff/env/Dockerfile \
 && cp customer/src/parameters.js.dist customer/src/parameters.js \
 && cp customer/env/Dockerfile.dist customer/env/Dockerfile \
 && cp admin/src/parameters.js.dist admin/src/parameters.js \
 && cp admin/env/Dockerfile.dist admin/env/Dockerfile \
 && cp storage/parameters.js.dist storage/parameters.js \
 && cp storage/env/Dockerfile.dist storage/env/Dockerfile \
 && cp www/env/Dockerfile.dist www/env/Dockerfile