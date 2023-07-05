import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

import { Response } from 'superagent';
import app from '../../index';
import { User } from '../models/User';
import Todo from '../models/Todo';

import { defaultUserData, userPostData, defaultTodo, postTodo } from './mocks/data.mock';

chai.use(chaiHttp);

const { expect } = chai;

export const launchRoleTest = (role: string) => {
    describe(role, () => {
        before((done) => {
            User.deleteMany({}).catch((error: any) => console.log(error));
            done();
        });

        after((done) => {
            User.deleteMany({}).catch((error: any) => console.log(error));
            done();
        });

        describe('DEFAULT DATA', () => {
            before((done) => {
                Todo.deleteMany({}).catch((error: any) => console.log(error));
                done();
            });
            let token: any;

            it('it should register test user', async () => {
                await chai.request(app).post('/api/auth/registration').send(defaultUserData);
            });

            it('it should login test user', async () => {
                const testLoginResponse: Response = await chai.request(app).post('/api/auth/login')
                    .send({"username": `${defaultUserData.username}`, "password": `${defaultUserData.password}`});

                token = testLoginResponse.body.token;
            });

            it('it should add test todo logged user', async () => {
                await chai.request(app).post('/api/todos')
                    .set("Authorization", `Bearer ${token}`)
                    .send(defaultTodo);
            });
        });

        let userRegisterData = {
            username: "register",
            password: "register",
            role: role,
            email: "register@gmail.com",
            firstname: "register",
            lastname: "register",
        }
    
        let userToken: string;
        let loggedUserId: string;
        let addParam: string = 'blabla';

        describe('REGISTRATION', () => {
    
            it('For registration user', async () => {
                const registerRes: Response = await chai.request(app).post('/api/auth/registration').send(userRegisterData);

                if (defaultUserData.username === userRegisterData.username) {
                    expect(registerRes.status).to.equal(400);
                    expect(registerRes.body).to.deep.equal({message: `User ${userPostData.username} already exists`});
                } else {
                    expect(registerRes.status).to.equal(201);
                    
                    loggedUserId = registerRes.body._id;
                }
            });

            describe('ERROR 404', async () => {
                it('should return a status code 404', async () => {
                    const httpResponse: Response = await chai.request(app).post(`/api/auth/registration/${addParam}`);

                    expect(httpResponse.status).to.equal(404);
                    expect(httpResponse.body).to.deep.equal({message: 'Not found'});
                });
            });
        });
    
        describe('LOGIN', async () => {
            it('For login user Login', async () => {
                const loginRes: Response = await chai.request(app).post('/api/auth/login')
                    .send({"username": `${userRegisterData.username}`, "password": `${userRegisterData.password}`});
    
                userToken = loginRes.body.token;

                if (!userToken) {
                    expect(loginRes.status).to.equal(400);
                    expect(loginRes.body).to.deep.equal({message: 'Token error'});
                } else {
                    expect(loginRes.status).to.equal(200);
                }
            });

            describe('ERROR 404', async () => {
                it('should return a status code 404', async () => {
                    const httpResponse: Response = await chai.request(app).post(`/api/auth/login/${addParam}`);

                    expect(httpResponse.status).to.equal(404);
                    expect(httpResponse.body).to.deep.equal({message: 'Not found'});
                });
            });
        });
    
        describe('USERS', async () => {
            /*
                * Test the /GET route
            */
            describe('/GET user', () => {
                it('it should GET all the users', async () => {
                    const httpResponse: Response = await chai.request(app).get('/api/users')
                        .set("Authorization", `Bearer ${userToken}`);
    
                    expect(httpResponse.status).to.equal(200);

                    if (role === 'ADMIN') {
                        expect(httpResponse.body).to.have.lengthOf(2);
                    } else {
                        expect([httpResponse.body]).to.have.lengthOf(1);
                    }
                });

                describe('ERROR 401', async () => {
                    it('should return a status code 401', async () => {
                        const httpResponse: Response = await chai.request(app).get(`/api/users`);
                        expect(httpResponse.status).to.equal(401);
                        expect(httpResponse.body).to.deep.equal({message: "Unauthorized"});
                    });
                });
            });

            /*
                * Test the /POST route
            */
            describe('/POST user', () => {
                it('it should POST a valid user', async () => {
                    const httpResponse: Response = await chai.request(app).post('/api/users')
                        .set("Authorization", `Bearer ${userToken}`)
                        .send(userPostData);

                    if (role === 'ADMIN') {
                        if (userRegisterData.username === userPostData.username) {
                            expect(httpResponse.status).to.equal(400);
                            expect(httpResponse.body).to.deep.equal({message: `User ${userPostData.username} already exists`});
                        }
                        expect(httpResponse.status).to.equal(201);
                    } else {
                        // ERROR 403
                        expect(httpResponse.status).to.equal(403);
                        expect(httpResponse.body).to.deep.equal({message: "Forbidden"});
                    }
                });

                describe('ERROR 401', async () => {
                    it('should return a status code 401', async () => {
                        const httpResponse: Response = await chai.request(app).post(`/api/users`);
                        expect(httpResponse.status).to.equal(401);
                        expect(httpResponse.body).to.deep.equal({message: "Unauthorized"});
                    });
                });

                describe('ERROR 404', async () => {
                    it('should return a status code 404', async () => {
                        const httpResponse: Response = await chai.request(app).post(`/api/users/${addParam}`)
                            .set("Authorization", `Bearer ${userToken}`);
    
                        expect(httpResponse.status).to.equal(404);
                        expect(httpResponse.body).to.deep.equal({message: 'Not found'});
                    });
                });
            });

            /*
                * Test the /GET/:id route
            */
            describe('/GET/:id user', () => {
                it('it should GET a user by the given id', async () => {
                    const httpResponse: Response = await chai.request(app).get(`/api/users/${loggedUserId}`)
                        .set("Authorization", `Bearer ${userToken}`);

                    expect(httpResponse.status).to.equal(200);
                    expect(httpResponse.body).to.have.a.property('_id').eql(loggedUserId);
                });
            

                describe('ERROR 400', async () => {
                    it('should return a status code 400', async () => {
                        const httpResponse: Response = await chai.request(app).get(`/api/users/${addParam}`)
                            .set("Authorization", `Bearer ${userToken}`);

                        expect(httpResponse.status).to.equal(400);
                        expect(httpResponse.body).to.deep.equal({message: `${addParam} is not valid id format`});
                    });
                });

                describe('ERROR 401', async () => {
                    it('should return a status code 401', async () => {
                        const httpResponse: Response = await chai.request(app).get(`/api/users/${loggedUserId}`);
                        expect(httpResponse.status).to.equal(401);
                        expect(httpResponse.body).to.deep.equal({message: "Unauthorized"});
                    });
                });
            });

            /*
                * Test the /PATCH/:id route
            */
            describe('/PATCH/:id user', async () => {
                it('it should UPDATE a user given the id', async () => {
                    const httpResponse: Response = await chai.request(app).patch(`/api/users/${loggedUserId}`)
                    .set("Authorization", `Bearer ${userToken}`)
                    .send({ username: "sergo" });

                    expect(httpResponse.status).to.equal(200);
                });

                describe('ERROR 400', async () => {
                    it('should return a status code 400', async () => {
                        const httpResponse: Response = await chai.request(app).patch(`/api/users/${addParam}`)
                            .set("Authorization", `Bearer ${userToken}`);

                        expect(httpResponse.status).to.equal(400);
                        expect(httpResponse.body).to.deep.equal({message: `${addParam} is not valid id format`});
                    });
                });

                describe('ERROR 401', async () => {
                    it('should return a status code 401', async () => {
                        const httpResponse: Response = await chai.request(app).patch(`/api/users/${loggedUserId}`);
                        expect(httpResponse.status).to.equal(401);
                        expect(httpResponse.body).to.deep.equal({message: "Unauthorized"});
                    });
                });
            });

            /*
                * Test the /DELETE/:id route
            */
            describe('/DELETE/:id user', () => {
                it('it should DELETE a user given the id', async () => {
                    const httpResponse: Response = await chai.request(app).delete(`/api/users/${loggedUserId}`)
                        .set("Authorization", `Bearer ${userToken}`);


                    if (role === 'ADMIN') {
                        expect(httpResponse.status).to.equal(200);
                        expect(httpResponse.body).to.be.an('object')
                        expect(httpResponse.body).to.deep.equal({message: 'user deleted'});
                    } else {
                        // ERROR 403
                        expect(httpResponse.status).to.equal(403);
                        expect(httpResponse.body).to.deep.equal({message: "Forbidden"});
                    }

                    describe('ERROR 400', async () => {
                        it('should return a status code 400', async () => {
                            const httpResponse: Response = await chai.request(app).delete(`/api/users/${addParam}`)
                                .set("Authorization", `Bearer ${userToken}`);
    
                            expect(httpResponse.status).to.equal(400);
                            expect(httpResponse.body).to.deep.equal({message: `${addParam} is not valid id format`});
                        });
                    });

                    describe('ERROR 401', async () => {
                        it('should return a status code 401', async () => {
                            const httpResponse: Response = await chai.request(app).delete(`/api/users/${loggedUserId}`);
                            expect(httpResponse.status).to.equal(401);
                            expect(httpResponse.body).to.deep.equal({message: "Unauthorized"});
                        });
                    });
                });  
            });  
        });


        describe('TODOS', () => {
            let todoId: any;
    
            after((done) => {
                Todo.deleteMany({}).catch(error => console.log(error));
                done();
            });

            /*
                * Test the /POST route
            */
            describe('POST todo', () => {
                it('it should POST a valid todo ', async () => {
                    const addTodoResponse: Response = await chai.request(app).post('/api/todos')
                        .set("Authorization", `Bearer ${userToken}`)
                        .send(postTodo);
    
                    expect(addTodoResponse.status).to.equal(201);
    
                    todoId = addTodoResponse.body._id;
                });
    
                describe('ERROR 401', async () => {
                    it('should return a status code 401', async () => {
                        const httpResponse: Response = await chai.request(app).post(`/api/todos`);
                        expect(httpResponse.status).to.equal(401);
                        expect(httpResponse.body).to.deep.equal({message: "Unauthorized"});
                    });
                });

                describe('ERROR 404', async () => {
                    it('should return a status code 404', async () => {
                        const httpResponse: Response = await chai.request(app).post(`/api/todos/${addParam}`)
                            .set("Authorization", `Bearer ${userToken}`);
    
                        expect(httpResponse.status).to.equal(404);
                        expect(httpResponse.body).to.deep.equal({message: 'Not found'});
                    });
                });
            });
    
            /*
                * Test the /GET route
            */
            describe('/GET todo', () => {
                it('it should GET all the todos', async () => {
                    const httpResponse: Response = await chai.request(app).get('/api/todos')
                        .set("Authorization", `Bearer ${userToken}`);

                    expect(httpResponse.status).to.equal(200);
    
                    if (role === 'ADMIN') {
                        expect(httpResponse.body).to.have.lengthOf(2);
                    } else {
                        expect([httpResponse.body]).to.have.lengthOf(1);
                    }
                });
    
                describe('ERROR 401', async () => {
                    it('should return a status code 401', async () => {
                        const httpResponse: Response = await chai.request(app).get(`/api/todos`);
                        expect(httpResponse.status).to.equal(401);
                        expect(httpResponse.body).to.deep.equal({message: "Unauthorized"});
                    });
                });
            });

            /*
                * Test the /GET/:id route
            */
            describe('/GET/:id todo', () => {
                it('it should GET a todo by the given id', async () => {
                    const httpResponse: Response = await chai.request(app).get(`/api/todos/${todoId}`)
                        .set("Authorization", `Bearer ${userToken}`);

                    expect(httpResponse.status).to.equal(200);
                });

                describe('ERROR 400', async () => {
                    it('should return a status code 400', async () => {
                        const httpResponse: Response = await chai.request(app).get(`/api/todos/${addParam}`)
                            .set("Authorization", `Bearer ${userToken}`);

                        expect(httpResponse.status).to.equal(400);
                        expect(httpResponse.body).to.deep.equal({message: `${addParam} is not valid id format`});
                    });
                });

                describe('ERROR 401', async () => {
                    it('should return a status code 401', async () => {
                        const httpResponse: Response = await chai.request(app).get(`/api/todos/${todoId}`);
                        expect(httpResponse.status).to.equal(401);
                        expect(httpResponse.body).to.deep.equal({message: "Unauthorized"});
                    });
                });
            });

            /*
                * Test the /PATCH/:id route
            */
            describe('/PATCH/:id todo', async () => {
                it('it should UPDATE a todo given the id', async () => {
                    const httpResponse: Response = await chai.request(app).patch(`/api/todos/${todoId}`)
                        .set("Authorization", `Bearer ${userToken}`)
                        .send({ title: "another title" });

                    expect(httpResponse.status).to.equal(200);
                    expect(httpResponse.body).to.have.a.property('title');
                });

                describe('ERROR 400', async () => {
                    it('should return a status code 400', async () => {
                        const httpResponse: Response = await chai.request(app).patch(`/api/todos/${addParam}`)
                            .set("Authorization", `Bearer ${userToken}`);

                        expect(httpResponse.status).to.equal(400);
                        expect(httpResponse.body).to.deep.equal({message: `${addParam} is not valid id format`});
                    });
                });

                describe('ERROR 401', async () => {
                    it('should return a status code 401', async () => {
                        const httpResponse: Response = await chai.request(app).patch(`/api/todos/${todoId}`);
                        expect(httpResponse.status).to.equal(401);
                        expect(httpResponse.body).to.deep.equal({message: "Unauthorized"});
                    });
                });
            });

            /*
                * Test the /DELETE/:id route
            */
            describe('/DELETE/:id todo', () => {
                it('it should DELETE a todo given the id', async () => {
                    const httpResponse: Response = await chai.request(app).delete(`/api/todos/${todoId}`)
                        .set("Authorization", `Bearer ${userToken}`)

                    expect(httpResponse.status).to.equal(200);
                    expect(httpResponse.body).to.be.an('object')
                    expect(httpResponse.body).to.deep.equal({message: 'todo deleted'});
                }); 

                describe('ERROR 400', async () => {
                    it('should return a status code 400', async () => {
                        const httpResponse: Response = await chai.request(app).delete(`/api/todos/${addParam}`)
                            .set("Authorization", `Bearer ${userToken}`);

                        expect(httpResponse.status).to.equal(400);
                        expect(httpResponse.body).to.deep.equal({message: `${addParam} is not valid id format`});
                    });
                });

                describe('ERROR 401', async () => {
                    it('should return a status code 401', async () => {
                        const httpResponse: Response = await chai.request(app).delete(`/api/todos/${todoId}`);
                        expect(httpResponse.status).to.equal(401);
                        expect(httpResponse.body).to.deep.equal({message: "Unauthorized"});
                    });
                });
            });
        });   
    });
};