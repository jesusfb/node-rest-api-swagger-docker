import mongoose, {Document} from "mongoose";
import bcrypt from "bcrypt";
import Joi from "joi";
import { NextFunction } from "express";
const { Schema, model } = mongoose;

import { IUser, RequestError } from '../interfaces';
const { BCRYPT_SALT } = require('../config');

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
    role: Joi.string().required().valid('USER', 'ADMIN'),
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

const schemas = {
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

userSchema.pre('save', async function (next) {
    let user: any = this;
    if (!user.isModified("password")) {
        return next();
    }
    const hash = await bcrypt.hash(user.password, BCRYPT_SALT);
    user.password = hash;
    next();
});

//@ts-ignore
userSchema.post('save', handleErrors);

const User = model<IUser>("User", userSchema);

export {
    User,
    schemas
}

