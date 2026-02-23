#!/bin/bash
docker exec -i -w /docker-entrypoint-initdb.d bookstore /bin/bash -c "bash 01-load-bookstore.sh"
