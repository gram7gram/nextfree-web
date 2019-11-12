#!/usr/bin/env bash

SERVER=185.181.8.42

ssh root@${SERVER} "cd /var/www/nextfree-web && bash update.sh master"
