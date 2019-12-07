#!/bin/bash

# Create containers
docker-compose build

nvm use 10

# Install dependencies
cd ./owner && npm i --production

cd ./api && npm i --production

cd ./customer && npm i --production

cd ./staff && npm i --production

cd ./storage && npm i --production

# Boot containers
docker-compose up -d
