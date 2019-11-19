#!/usr/bin/env bash

echo '[+] Build customer...'
docker-compose exec customer npm run build:prod
test $? -gt 0 && exit 1

echo '[+] Build owner...'
docker-compose exec owner npm run build:prod
test $? -gt 0 && exit 1

echo '[+] Build staff...'
docker-compose exec staff npm run build:prod
test $? -gt 0 && exit 1

echo '[+] Build admin...'
docker-compose exec admin npm run build:prod
test $? -gt 0 && exit 1

git add owner/build customer/build staff/build admin/build
test $? -gt 0 && exit 1

git commit -m '#master build'
test $? -gt 0 && exit 1

echo '[+] Completed'