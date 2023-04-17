# Node-Rest-Api-Swagger

This is a node.js based REST CURD demo project, providing general functions like User Signup and Login, APIs Authorization, using REST Apis to create/update/get/delete users and todo lists. You can register a user with two roles: `ADMIN` and `USER`. After login, specific actions are available for each role.
# Knowledge Cover

- CURD Operation
- SwaggerUI & OpenApi 3.0
- Node.js
- Express.js
- CORS
- Rest API
- MongoDB & Mongoose
- APIs Authorization (JWT)
- Docker

# How to use

## 1. Clone Project into your local machine
```
git clone https://github.com/SerhiiNikif/node-express-typescript-swagger-rest-api.git
```

## 2. Go into project folder and install project dependencies.

```
cd node-express-typescript-swagger-rest-api && npm i
```

## 3. Connecting to Database

### Default DB URI is as follows:

Please make sure mongoDB Server service is installed and running on your localhost:27017.

```
MONGO_URI=mongodb://localhost:27017/db
```

> Alternatively, if you would like to connect DB remotely, just change DB URI in `.env` file.

> For more details about MongoDB, click [here](https://www.mongodb.com/).

## 4. Setting environment file `.env`.

Simply copy `.env.sample` as `.env`, then edit it based on your need.
```
JWT_SECRET='SECRET_VALUE'
DOCKER_MONGO_URI=mongodb://mongo:27017/node-app
MONGO_URI=mongodb://localhost:27017/db
MONGODB_LOCAL_PORT=27017
MONGODB_DOCKER_PORT=27017

NODE_LOCAL_PORT=80
NODE_DOCKER_PORT=4000

```

## 5. Start project

```
npm run dev-local
```

## 6. Test project

```
npm run test
```

## 7. Play with APIs now !
Now, you are ready to test all APIs.
Just simply open your browser http://localhost/api-docs.
#### If you run docker:
Just simply open your browser http://localhost:4000/api-docs.

# Docker

> #### Docker need to be installed in your OS. To install Docker, please click [here](https://docs.docker.com/get-docker/) .

> #### Please make sure you have followed Step 1 ~ Step 4 as above.

### Under the root path of project, start Docker service

Development:
```
npm run docker-compose-up:dev
```
Production:
```
npm run docker-compose-up:prod
```
# Access rights

APIs implement access logic for `ADMIN` and `USER` [roles](#table)

# APIs Authorization

> All APIs are protected by accessToken (JWT).

## When calling these protected APIs, make sure you add %BearerToken% in `Authorization` request Header.

```
Authorization: Bearer <accessToken>
```

## How to get accessToken ?

When user login sucessfully, an unique accessToken will be returned.

# Available APIs

## Auth
> When creating a user, we specify a role and this gives us access to certain APIs.

| APIs                   | Method |         Desc          |
| ---------------------- | :----: | :-------------------: |
| /api/auth/registration |  POST  | Register user account |
| /api/auth/login        |  POST  |      User Login       |

<a id="table"></a>
## APIs for the ADMIN role

| APIs                 | Method  |         Desc           |
| -------------------- | :-----: | ---------------------- |
| /api/users/          |  GET    | Get all users          |
| /api/users/          |  POST   | Create a new user      |
| /api/users/{userID}  |  GET    | Get a user by ID       |
| /api/users/{userID}  |  PATCH  | Update a user by ID    |
| /api/users/{userID}  |  DELETE | Delete a user by ID    |

| APIs                 | Method  |         Desc           |
| -------------------- | :-----: | ---------------------- |
| /api/todos/          |  GET    | Get all todos          |
| /api/todos/          |  POST   | Create a new todo      |
| /api/todos/{todoID}  |  GET    | Get a todo by ID       |
| /api/todos/{todoID}  |  PATCH  | Update a todo by ID    |
| /api/todos/{todoID}  |  DELETE | Delete a todo by ID    |

## APIs for the USER role

| APIs                 | Method  |         Desc                     |
| -------------------- | :-----: | -------------------------------- |
| /api/users/          |  GET    | Get the logged in user           |
| /api/users/{userID}  |  PATCH  | Update the logged in user by ID  |

> For this role, the user can only work with those todos that he __himself__ created.

| APIs                 | Method  |         Desc        |
| -------------------- | :-----: | ------------------- |
| /api/todos/          |  GET    | Get all todos       |
| /api/todos/          |  POST   | Create a new todo   |
| /api/todos/{todoID}  |  GET    | Get a todo by ID    |
| /api/todos/{todoID}  |  PATCH  | Update a todo by ID |
| /api/todos/{todoID}  |  DELETE | Delete a todo by ID |
