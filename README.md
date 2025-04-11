# MongoStore a MongoDB REST API

Se [changelog](./CHANGELOG.md)
 
## applikationen

Der anvendes MongoDB Native Node.js driver.
 
Package **joi** anvendes til JSON schema validering. Den har afløst den oprindelige @hapi/joi.

Kombinationen af MongoDB og joi anvendes i stedet for Mongoose. 

Kombinationen har den fordel, at MongoDB native Node.js implementering er tættere på MongoDB CLI herunder JavaScript implementeringen i CLI

Databasen kan være en lokal instans eller en MongoDB Atlas cloud instans. 

Der er implementeret et REST API til databasen **bookstore-mysql**

## Databasen 

Ved anvendelse på kvm instanser skal **.env** opdateres til at pege på instansen med databasen

databasen kan restores med NoSQLBooster import mongorestore::

    /home/projects/devops/data/mongodb/bookstore-mysql-archive/archive
    
Restore med på hosten::

  mongorestore --archive=/home/projects/devops/data/mongodb/bookstore-mysql-archive --drop --dryRun

Restore i virtual machine::

    mongorestore --archive=/nfs/data/mongodb/bookstore-mysql-archive/ --drop --dryRun

Fjern --dryRun for at eksekvere 

Collection counters indeholder en counter for next_value for næste id til en ny post i databasen

Start værdien er sat til next value 50 for authors, books, bookorder, user men ikke for orderlines

Restore i docker container::

  bash mongodb-restore.sh

Restore alle MongoDB databaserne

## Run appen på hosten victoria
På hosten Victoria udføres (kan debugges)::

    npm start   

browser: http://localhost:3300

docker::

    docker compose -f docker-compose-db.yml up -d

## run med docker nginx frontend
Med slim4-frontend (kan **ikke** debugges)::

    docker compose up -d

browser: http://localhost for adgang via slim4-frontend
browser: http://localhost:3300 for direkte adgang til mongostore

Filen ``docker-mongodb-backend.yaml`` kan kun anvendes som backend til js-training, som inkluderer denne fil. Netværksdefinitionen findes i projekt jstraining.


## Virtuelle instanser (archer.test)

- instansen bringes op
- appen startes med

```shell
  py-js
```

Valg af optionen jstraining + mongostore

browser: https://archer.test

Debug:
- Stands pm2 processen mongostore
- Start run config *Archer Run og Debug*
- Der kan debugge som normalt

Bemærk,
- Der er kun adgang via adressen https://archer.test
- Firewall blokerer for direkte adgnag til port 3000 og 3300

## Debug på victoria
Start mongodb containeren

    docker compose -f docker-compose-db.yml up -d

Start appen

    run config nodemon

## Test på Victoria
Start mongodb containeren

    docker compose -f docker-compose-db.yml up -d

Start test (kan debugges)

    npm test


## Test docker med nginx frontend
Start appen

    docker compose

Udfør test (kan ikke debugges)

    Run config dokcer All tests 

## Test på archer
start applikationen
```shell
py-js
```
- Stands pm2 processen
- Start run config *Archer test*

Alternativt i Archer terminalvindue
```shell
    cd /nfs/code-js/mongodstore/web
    npm test
```

## test med WebStorm http Requests

Valideringer og controllere for

- users
- authors
- books

## Test med Supertest

Mappen routes/__tests__ indeholder enkelte tests af routes med supertest

**Important**, disse tests kan ikke køres med tests der mocker routes.

Der er pt ingen tests som mocker routes.
