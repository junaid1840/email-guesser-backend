## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
# APIs
### 1. Guess User Email
 * URL -> `/`
 * Method Type -> `GET`
 * Request Query
   ```bash
   /?firstName=Junaid&lastName=Nazir&domain=google.com
   ```
 * Success Response
   ```bash
   {
     "statusCode": 201,
     "data": {
         "email": "junaidnazir@google.com",
         "firstName": "Junaid",
         "lastName": "Nazir",
         "domain": "google.com"
     }
   }
   ```
 * Failure Response (If domain name is not in the sample JSON)
  
   ```bash
   {
     "status": 404,
     "error": "The given domain name is unrecognized."
   }
   ```
    
Currently, this API only supports these domains with formula username:

   ```bash
    {
        "Jane Doe": "jdoe@babbel.com",
        "Jay Arun": "jayarun@linkedin.com",
        "David Stein": "davidstein@google.com",
        "Junaid Nazir": "junaid@tintash.com",
        "Alex Jon": "jon@arbisoft.com",
        "hashim Saeed": "hassae@colony.com"
    }
   ```
