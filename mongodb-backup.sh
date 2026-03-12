#!/bin/bash
set -eu

docker exec -i -u 1000 -w /docker-entrypoint-initdb.d bookstore /bin/bash << 'EOD'
declare  dato
dato=$(date +"%Y-%m-%d")
readonly dato

mongodump --db=bookstore-mysql --archive="${DOWNLOAD_PATH}"/bookstore-mysql-"${dato}"-archive

if [[ $? ]]; then
  echo alt er eksporteret - rename og flyt til devops/data/mongodb/docker
else
  echo Noget gik galt
fi
EOD
