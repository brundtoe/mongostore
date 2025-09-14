#!/usr/bin/env bash

docker rm -f $(docker ps -aq)  > /dev/null 2>&1 || echo Der er ingen containere
