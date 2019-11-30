#!/usr/bin/env bash

CURRENT=$PWD

echo '[+] Build customer...'
cd $CURRENT/customer && npm run build:prod
test $? -gt 0 && exit 1

echo '[+] Build owner...'
cd $CURRENT/owner && npm run build:prod
test $? -gt 0 && exit 1

echo '[+] Build staff...'
cd $CURRENT/staff && npm run build:prod
test $? -gt 0 && exit 1

echo '[+] Build admin...'
cd $CURRENT/admin && npm run build:prod
test $? -gt 0 && exit 1

git add owner/build customer/build staff/build admin/build
test $? -gt 0 && exit 1

git commit -m '#master build'
test $? -gt 0 && exit 1

echo '[+] Completed'