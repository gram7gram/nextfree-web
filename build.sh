#!/usr/bin/env bash

docker-compose exec admin npm run build:prod

git add admin/build

git commit -m '#master build'