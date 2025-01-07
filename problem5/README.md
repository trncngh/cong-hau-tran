# Problem 5: A Crude Server

Duration: You should not spend more than 16 hours on this problem.
Time estimation is for internship roles, if you are a software professional you should spend significantly less time.

## Task

Develop a backend server with ExpressJS. You are required to build a set of CRUD interface that allow a user to interact with the service. You are required to use TypeScript for this task.

1. Interface functionalities:
   a. Create a resource.
   b. List resources with basic filters.
   c. Get details of a resource.
   d. Update resource details.
   e. Delete a resource.
2. You should connect your backend service with a simple database for data persistence.
3. Provide [`README.md`](http://README.md) for the configuration and the way to run application.

# Solution

This is a simple CRUD API that allows a user to interact with the service. The API is built using ExpressJS and TypeScript. The API provides the following endpoints:

| Endpoint        | Method | Params                         | Body                                          | Description                     |
| --------------- | ------ | ------------------------------ | --------------------------------------------- | ------------------------------- |
| /product        | GET    | None                           | None                                          | Get all products                |
| /product/:id    | GET    | None                           | None                                          | Get a product by its id         |
| /product/       | POST   | None                           | `{ "name", "price", "stock", "description" }` | Create new product              |
| /product/:id    | PATCH  | None                           | `{ "name", "price", "stock", "description" }` | Update product                  |
| /product/:id    | DELETE | None                           | None                                          | Delete a specific product by id |
| /product/       | DELETE | None                           | None                                          | Delete all products             |
| /product/search | GET    | `name&description&price&stock` | None                                          | Filtering products              |

## Installation & Setup

Pre-requisites: Node and any package manager (npm or yarn) should be installed on your machine.

For this simple example, I use sqlite for storingdata, so you don't need to install any database.

Installing dependencies:

```
   yarn install
```

Run on Development:

```
   yarn dev
```

The server will be running on `http://localhost:3000`.
