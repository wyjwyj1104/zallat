## Introduction

`backend-api` 3rd party API to create an express.js base API.
* Start date: 202010200100
* V0: 202010200112 Project setup.
* V1: 202010200317 Basic (1)(2) endpoints.

## Source
Please use the child series from this page (CO2 emission from Coal consumption for Electrical power production) as reference:
* https://www.eia.gov/opendata/qb.php?category=2251609



## Prerequisite

* [NodeJs 12](https://nodejs.org/en/). It is recommended to use a version manager such as [NVM](https://github.com/nvm-sh/nvm) to install NodeJS.

## Setup and running the app

```
# development
$ npm install
$ npm start
```

## Test

### Unit test

```
$ npm test
```

### Postman  test

* **Run Server:**
```
$ npm start
```

* **Basic Auth:**: Username: "admin", Password: "qwe123"
* **Get data (1):**: http://localhost:3000/data?year=2000&state=California
* **Get data in range (2):**: http://localhost:3000/data/range?from=2003&to=2006&state=California


## Fundamentals

The code is divided into different modules which consist of 3 layers: Controller, Business Service, and Data Model.

* **Controllers:** are responsible for handling incoming request and returning response to the client.
* **Services:** are responsible for handling the actual business logic.  
* **Models:** are the representations of the business model.


## Clear process

### Dev purpose

```
$ lsof -i tcp:3000
$ kill -9 PID
```

### Dev purpose

```.todo
- [x] Project setup.
- [x] Task 1 - Endpoint to get data using state code and year.
- [x] Taks 2 - Endpoint to get data sum using state code and year ranges.
- [] Mock test using sinon and supertest.
- [] Link to MongoDB with mongoose
```
