#!/bin/bash
docker exec -i --user jackie -w /docker-entrypoint-initdb.d mongodb /bin/bash -c "bash 01-load-bookstore.sh"
