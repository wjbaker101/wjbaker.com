# API Structure

## Layers

### Repository

`/backend/repository/**`

This deals directly with the MySQL queries to the database. It is responsible for mapping data from the database format to the API format.

### Service

`/backend/service/**`

This layer will handle the business logic of the API, dealing with mutations of the data. If an error occurs it will throw it without catching it.

### Controller

`/backend/controller/**`

The controller is the interface of the API, and will take in requests. It will pass request information to the service layer and handle what response to give with the service's return value or errors.