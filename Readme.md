# MongoStore a MongoDB REST API

Der anvendes MongoDB Native Node.js driver.
 
Package **@hapi/joi** anvendes til JSON schema validering.

https://hapi.dev/ er et Node.js framework, som tilbyder samme funktionalitet som Express https://expressjs.com/

Kombinationen af MongoDB og Hapi/joi anvendes i stedet for Mongoose. 

Kombinationen har den fordel, at MongoDB native Node.js implementering er tættere på MongoDB CLI herunder JavaScript implementeringen i CLI

Databasen kan være en lokal instans eller en MongoDB Atlas cloud instans. 

## applikationen

Der er implementeret et REST API til databasen **bookstore-mysql**

## test

valideringere og controllere for

- users
- authors
- books

er foretaget med WebStorm http Requests

validering og controller for

- orders

er foretaget med Jest



  
