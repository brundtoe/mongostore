#!/usr/bin/env bash
#
# Fjern alle containere
#
docker rm -f $(docker ps -aq)  > /dev/null 2>&1 || echo Der er ingen containere
