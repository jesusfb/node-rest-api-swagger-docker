import mongoose, {Document} from "mongoose";
import {NextFunction} from "express";
import {RequestError} from "../app";
import Joi from "joi";
const {Schema, model} = mongoose;
import { ITodo } from '../interfaces';

const todoSchema = new Schema<ITodo>({
    title: {type: String, required: true},
    body: {type: String, required: true}
}, { timestamps: true} );

const todoAdd = Joi.object({
    title: Joi.string().min(1).required(),
    body: Joi.string().min(1).required()
});

const todoUpdate = Joi.object({
    title: Joi.string().min(1),
    body: Joi.string().min(1)
});

export const schemas = {
    todoAdd,
    todoUpdate
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
todoSchema.post('save', handleErrors);

const Todo = model<ITodo>("Todo", todoSchema);

export default Todo;

