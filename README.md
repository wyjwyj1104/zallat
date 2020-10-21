## Introduction

`backend-api` 3rd party API to create an express.js base API.
* Note: All error handling are placed wtih error code 500 internal server error for consistency.
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

## .env
* Since it is public project I decided to just put the password here just in case who wants to view the DB.

```
NODE_ENV=dev
DB_URL=mongodb+srv://cluster0.lwvjg.mongodb.net/zallat
DB_USER=admin
DB_PASS=oSSeeKH2n5arlZSg
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
* **Get highest data in range (3):**: http://localhost:3000/data/range/highest?from=2000&to=2008
  * This is tested with data stored in MongoDB
  * Data 1:  { California,    2000, 2.103701  }
  * Data 2:  { Alabama,       2000, 74.939037 }
  * Data 3:  { Michigan,      2001, 65.831112 }
  * Data 4:  { North Dakota,  2003, 30.920418 }
  * Data 5:  { Vermont,       2008, 0         }
  * Data 6:  { West Virginia, 2001, 75.262291 }
  * Result:  { West Virginia, 2001, 75.262291 }


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
- [X] Link to MongoDB with mongoose
- [x] Taks 3 - Endpoint to get highest data using year ranges.
```
