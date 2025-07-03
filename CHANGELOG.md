# Changelog

## 3. juli 2025

Opgraderet til Express 5.1.0
- udførte opgraderingskontrol ``npx @expressjs/codemod upgrade .``
- der var ikke behov for manuelle ændringer
- alle tests med jasmine Ok
- alle tests fra jstraining med js-mysqldemo som backend Ok


## Maj 2025

Optimering af error handling
- bin/www tilføjede process handling af unresolved promises og unhandled expectations
- app.js forenklede error handling
- errorhandler revideret er nu en enkelt funktion som error middleware
- errorhandler returner altid et error objekt.

## Opdateret februar 2025

Docker-compose anvender nu envvars til definition af ip adreserne

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
