#!/bin/bash

# Create containers
docker-compose build

nvm use 10

# Install dependencies
cd ./owner && npm i

cd ./api && npm i

cd ./customer && npm i

cd ./staff && npm i

# Boot containers
docker-compose up -d
