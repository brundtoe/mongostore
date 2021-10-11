# MongoStore a MongoDB REST API

## status oktober 2021

npm packages er opdateret.

Den vigtigste er opdatering af mongodb native nodejs driver til version 4.1.3

der er som følge af denne opdatering foretaget justering af kald af insertOne, som har fået ny return value

**important**
    Der er en fejl når testcaes udføres i en sekvens, så fejler findOnAndUpdate eller findOneAndReplace, idet cache eller lignende anvender de gamle data.

    hvis testcase gentages manuelt en af gangen så fungerer det.

Der anvendes MongoDB Native Node.js driver.
 
Package **joi** anvendes til JSON schema validering. Den har afløst den oprindelige @hapi/joi.

Kombinationen af MongoDB og joi anvendes i stedet for Mongoose. 

Kombinationen har den fordel, at MongoDB native Node.js implementering er tættere på MongoDB CLI herunder JavaScript implementeringen i CLI

Databasen kan være en lokal instans eller en MongoDB Atlas cloud instans. 

## applikationen

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

    npm start

Browser: http://localhost:3000

## test med WebStorm http Requests

valideringer og controllere for

- users
- authors
- books

## test med Jest

for controller

- orders




  
