# Node-Rest-Api-Swagger

This is a restful-api for two types of users - `ADMIN`, `USER`. Two models are implemented: users and to-do lists. You can register/login. You can also reset your passwor, after which you will receive an email. After logging in, each user can create to-do lists. A usual user can perform CRUD operations on their profile and only for their to-do lists, an administrator can perform CRUD operations on any users and to-do lists.
# Knowledge Cover

- Node.js (Express.js)
- TypeScript
- SOA
- Rest API
- MongoDB & Mongoose
- CRUD Operation
- API documentation on Swagger
- APIs Authorization (JWT)
- Reset password (Nodemailer gmail)
- CORS
- Field validation
- Error handling
- Mocha, Chai
- Docker

# How to use

## 1. Clone Project into your local machine
```
git clone https://github.com/SerhiiNikif/node-rest-api-swagger-docker.git
```

## 2. Go into project folder

```
cd node-rest-api-swagger-docker
```

## 3. Setting environment file .env.
Create an `.env` file in the root of the project and fill it with the values ​​from the `.env.sample` file.
```
JWT_SECRET='SECRET_VALUE'

MONGO_LOCAL_URI=mongodb://localhost:27017/db
MONGO_LOCAL_PORT=27017
NODE_LOCAL_PORT=3000

MONGO_DOCKER_URI=mongodb://mongo:27017/node-app
MONGO_DOCKER_PORT=27017
NODE_DOCKER_PORT=4000
```

## 4. Start project
> #### Docker need to be installed in your OS. To install Docker, please click [here](https://docs.docker.com/get-docker/).
Development:
```
npm run docker-compose-up:dev
```
Production:
```
npm run docker-compose-up:prod
```

## 5. Play with APIs now !
Now, you are ready to test all APIs.
Just simply open your browser http://localhost:3000/api-docs.



## 6. Use app locally:
> #### Please make sure you have followed Step 1 ~ Step 3 as above.
Please make sure mongoDB Server service is installed and running on your localhost:27017.

```
npm install
```

```
npm run dev-local
```
Open your browser http://localhost:3000/api-docs.


## 7. Test project

```
npm run test
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

| APIs                           | Method |         Desc                                    |
| -------------------------------| :----: | :---------------------------------------------: |
| /api/auth/registration         |  POST  | Register user account                           |
| /api/auth/login                |  POST  |      User Login                                 |
| /api/auth/requestResetPassword |  POST  | Password reset request, send an email to gmail  |
| /api/auth/resetPassword        |  POST  | Password reset, send an email to gmail          |

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
