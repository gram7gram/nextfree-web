#!/usr/bin/env bash

docker-compose exec owner npm run build:prod

docker-compose exec customer npm run build:prod

git add owner/build customer/build

git commit -m '#master build'