# MongoStore a MongoDB REST API

Der anvendes MongoDB Native Node.js driver.
 
Package **@hapi/joi** anvendes til JSON schema validering.

https://hapi.dev/ er et Node.js framework, som tilbyder samme funktionalitet som Express https://expressjs.com/

Kombinationen af MongoDB og Hapi/joi anvendes i stedet for Mongoose. 

Kombinationen har den fordel, at MongoDB native Node.js implementering er tættere på MongoDB CLI herunder JavaScript implementeringen i CLI

Databasen kan være en lokal instans eller en MongoDB Atlas cloud instans. 

## applikationen

Der er implementeret et REST API til databasen **bookstore-mysql**

## databasen 

databasen kan restores med NoSQLBooster import mongorestore

    /home/jackie/dumps/mongodb/bookstore-mysql-archive/archive

## run appen

    npm start

Browser: http://localhost:3000

## test med WebStorm http Requests

valideringere og controllere for

- users
- authors
- books

## test med Jest

for controller

- orders




  
