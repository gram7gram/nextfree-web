#!/bin/bash

# Create containers
docker-compose build

nvm use 10

# Install dependencies
cd ./owner && npm i --silent

cd ./api && npm i --silent

cd ./admin && npm i --silent

# Boot containers
docker-compose up -d

# Prepare production app
cd ./owner && ./npm run build:prod

cd ./admin && ./npm run build:prod
