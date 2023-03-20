import { Types } from 'mongoose';
import { Request } from 'express';

export interface IRequestWithUserId extends Request {
    userId?: Types.ObjectId,
    userRole?: string
}

export interface IUser {
    username: string,
    password: string,
    role: string,
    email: string,
    firstname: string,
    lastname: string
}

export interface ITodo {
    title: string,
    body: string,
    userId: Types.ObjectId
}
