import mongoose, {Document} from "mongoose";
import {NextFunction} from "express";
import {RequestError} from "../app";
import Joi from "joi";
const {Schema, model} = mongoose;
import { IUser } from '../interfaces';

const userSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    email: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true}
}, { timestamps: true} );

const userAdd = Joi.object({
    username: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(2).required(),
    role: Joi.string().required(),
    email: Joi.string().min(4).max(255).required().email(),
    firstname: Joi.string().min(2).max(255).required(),
    lastname: Joi.string().min(2).max(255).required(),
});

const userUpdate = Joi.object({
    username: Joi.string().min(2).max(255),
    password: Joi.string().min(2),
    role: Joi.string(),
    email: Joi.string().min(4).max(255).email(),
    firstname: Joi.string().min(2).max(255),
    lastname: Joi.string().min(2).max(255),
});

export const schemas = {
    userAdd,
    userUpdate
}

const handleErrors = (error: RequestError, data: Document, next: NextFunction)=> {
    const {name, code} = error;
    
    if(name === "MongoServerError" && code === 11000) {
        error.status = 409;
    } else {
        error.status = 400;
        error.message = "missing required name field";
    }
    next()
}
//@ts-ignore
userSchema.post('save', handleErrors);

const User = model<IUser>("User", userSchema);

export default User;

