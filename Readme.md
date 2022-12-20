# MongoStore a MongoDB REST API


## Opdateret december 2022
Require dotenv er indsat som den første linie i app.js. Jest mock har en sideeefkt som medfører at værdien i .env bliver undefined

Løsnignen er at indsætte følgende web/config.js, hvor variable fra .env anvendes.

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

  docker exec -it --user jackie mongodb /bin/bash
  cd /docker-entrypoint-initdb.d
  01-load-bookstore.sh

## run appen
PÅ hosten udføres::

    npm start

browser: http://localhost:3300

docker::

    docker-compose up

browser: http://localhost:3300

virtuelle instanser (archer.test)

- instansen bringes op
- appen startes med

```shell
  py-js
```
Vlag af optionen jstraining + mongostore

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

  
