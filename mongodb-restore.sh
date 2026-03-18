#!/bin/bash

if [ -e "$DEVCONTAINER_CONFIG_PATH" ] ; then
  echo "kan ikke udføres fra dev container"
else
  docker exec -i -w /docker-entrypoint-initdb.d bookstore /bin/bash -c "mongorestore --archive=/docker-entrypoint-initdb.d/bookstore-mysql-archive --drop"
fi
