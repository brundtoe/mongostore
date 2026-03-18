#!/bin/bash
docker exec -i -w /docker-entrypoint-initdb.d bookstore /bin/bash -c "mongorestore --archive=/docker-entrypoint-initdb.d/bookstore-mysql-archive --drop"
