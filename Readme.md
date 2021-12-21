# MongoStore a MongoDB REST API

## status november 2021

Route users er ændret til customers, for at kunne anvende den som backend til slim4-frontend og vite-demo

Appen anvender i øvrigt begrebet users uændret, da denne ændring kræve omfattende refaktorering.


## status oktober 2021

npm packages er opdateret.

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

databasen kan restores med NoSQLBooster import mongorestore

    /home/projects/devops/data/mongodb/bookstore-mysql-archive/archive
    
Restore med på hosten

  mongorestore --archive=/home/projects/devops/data/mongodb/bookstore-mysql-archive --drop --dryRun

Restore i virtual machine

    mongorestore --archive=/devops/data/mongodb/bookstore-mysql-archive/ --drop --dryRun

Fjern --dryRun for at eksekvere 

collection counters indeholder en counter for next_value for næste id til en ny post i databasen

start værdien er sat til next value 50 for authors, books, bookorder, user men ikke for orderlines


## run appen
PÅ hosten udføres::

    npm start

browser: http://localhost:3300

docker::

    docker-compose up

browser: http://localhost:3300

vagrant instanser (archer.test)

- instansen bringes op
- appen startes med
    
    cd /nfs/jinja-demo
    sudo python3 jsd-menu.py

browser: http://archer.test
## test med WebStorm http Requests

valideringer og controllere for

- users
- authors
- books

## test med Jest

for controller

- orders

## Test med Supertest

Mappen routes/__tests__ indeholder enketle tests af routes med supertest

**important**, disse tests kan ikke køres med tests der mocker routes.

Der er pt ingen tests som mocker routes.


  
