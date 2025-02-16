# MongoStore a MongoDB REST API




## Opdateret februar 2025

docker-compose anvender nu envvars til definition af ip adreserne

Filen ``docker-mongodb-backend.yaml`` kan kun anvendes som backend til js-training, som inkluderer denne fil. Netværksdefinitionen findes i projekt jstraining.

## Opdateret februar 2023

NodeJs version 17 introducerede ipv6 som default netværkstprotokol. Derfor er der for docker config for backend anvendt fast ip adresse 172.18.0.43

Docker .env indeholder definitioner på ip adressen for node og mongodb instanserne

## Opdateret december 2022
Require dotenv er indsat som den første linie i app.js. 
Løsnignen er at indsætte følgende web/config.js, hvor variable fra .env anvendes.

Node packages er opdateret

```js
  require('dotenv').config()
```

## status november 2021

Route users er ændret til customers, for at kunne anvende den som backend til slim4-frontend og vite-demo

Appen anvender i øvrigt begrebet users uændret, da denne ændring kræve omfattende refaktorering.


## status oktober 2021

Npm packages er opdateret.

- Den vigtigste er opdatering af mongodb native nodejs driver til version 4.1.3
- Der er som følge af denne opdatering foretaget justering af kald af insertOne, som har fået ny return value
- i update actions er {returnOriginal: false} erstattet af {returnDocument: 'after'}

- opdateret config.js så appen fungerer med docker og vagrant
- tilføjet docker-compose
- 
## applikationen

Der anvendes MongoDB Native Node.js driver.
 
Package **joi** anvendes til JSON schema validering. Den har afløst den oprindelige @hapi/joi.

Kombinationen af MongoDB og joi anvendes i stedet for Mongoose. 

Kombinationen har den fordel, at MongoDB native Node.js implementering er tættere på MongoDB CLI herunder JavaScript implementeringen i CLI

Databasen kan være en lokal instans eller en MongoDB Atlas cloud instans. 

Der er implementeret et REST API til databasen **bookstore-mysql**

## databasen 

Ved anvendelse på non-vagrant instanser skal **.env** opdateres til at pege på instansen med databasen

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

## run appen
PÅ hosten udføres::

    npm start

browser: http://localhost:3300

docker::

    docker-compose up -d

browser: http://localhost for adgang via slim4-frontend
browser: http://localhost:3300 for direkte adgang til mongostore

Filen ``docker-mongodb-backend.yaml`` kan kun anvendes som backend til js-training, som inkluderer denne fil. Netværksdefinitionen findes i projekt jstraining.


virtuelle instanser (archer.test)

- instansen bringes op
- appen startes med

```shell
  py-js
```
Valg af optionen jstraining + mongostore

browser: https://archer.test

## test med WebStorm http Requests

Valideringer og controllere for

- users
- authors
- books

## test med Jest

For controller

- orders

## Test med Supertest

Mappen routes/__tests__ indeholder enkelte tests af routes med supertest

**Important**, disse tests kan ikke køres med tests der mocker routes.

Der er pt ingen tests som mocker routes.

  
