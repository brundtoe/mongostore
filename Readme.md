# MongoStore a MongoDB REST API

## status november 2021

Route users er ændret til customers, for at kunne anvende den som backend til slim4-frontend og vite-demo

Appen anvender i øvrigt begrebet users uændret, da den er skabt med en udgave af bookstore som indheodler users collection, der er den samme udgave der avnendes af projekt user-registration


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

    /home/jackie/dumps/mongodb/bookstore-mysql-archive/archive

Restore med 

    mongorestore --archive /devops/data/mongodb/booktore-mysql-archive/ --drop --dryRun

Fjern --dryRun for at eksekvere 

collection counters indeholder en counter for next_value for næste id til en ny post i databasen

start værdien er sat til next value 50 for authors, books, bookorder, user men ikke for orderlines


## run appen
PÅ hosten udføres::

    npm start

browser: http://localhost:3000

docker::

    docker-compose up

browser: http://localhost:3000

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




  
