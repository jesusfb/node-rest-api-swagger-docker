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

### Connect to DB remotely:

Change DB URIs in .env file.
Please make sure mongoDB Server service is installed and running on your localhost:3000.
> For more details about MongoDB, click [here](https://www.mongodb.com/).

## 4. Setting environment file `.env`.

Simply copy `.env.sample` as `.env`, then edit it based on your need.
```
# App config
PORT=3000

# Default DB URI
MONGO_URI=mongodb+srv://<username>:<password>@<clustername>.cm9ty.mongodb.net/<collectionname>?retryWrites=true&w=majority

# Random sercet used for generating API accessToken
JWT_SECRET=%some_secrets%

```

## 5. Start project

Use 2 terminals at once:
1. To compile TypeScript files
```
npm run watch
```
2. Start the server
```
npm run dev
```

## 6. Play with APIs now !
Now, you are ready to test all APIs.
Just simply open your browser http://localhost:3000/api-docs.

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
