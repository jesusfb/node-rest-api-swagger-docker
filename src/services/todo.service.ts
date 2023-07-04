import { Types } from 'mongoose';
import Todo from "../models/Todo";
import createError from '../helpers/errors/createError';

const getTodos = async (userId: Types.ObjectId | undefined, userRole: string | undefined) => {
    let result;

    if (userRole == 'ADMIN') {
        result = await Todo.find();
    } else {
        result = await Todo.find({ userId: userId });
    }

    return result
}

const addTodo = async (userId: Types.ObjectId | undefined, title: string, body: string) => {
    const result = await Todo.create({ title, body, userId });

    return result
}

const getTodo = async (id: string, userId: Types.ObjectId | undefined, userRole: string | undefined) => {
    let result;

    if (userRole == 'ADMIN') {
        result = [await Todo.findById(id)];
    } else {
        result = await Todo.findById(id).find({ userId: userId });
    }

    if (!result.length) throw createError(404);
    
    return result[0]
}

const deleteTodo = async (id: string, userId: Types.ObjectId | undefined, userRole: string | undefined) => {
    let result

    if (userRole == 'ADMIN') {
        result = await Todo.findByIdAndDelete(id)
    } else {
        result = await Todo.findOne({ _id: id, userId: userId });

        if (result) {
            await Todo.findByIdAndDelete(id);
        }
    }

    if (!result) throw createError(404);

    return {message: "todo deleted"}
}

const editTodo = async (id: string, userId: Types.ObjectId | undefined, 
        userRole: string | undefined, body: any) => {
    let result;

    if (userRole == 'ADMIN') {
        result = await Todo.findByIdAndUpdate(id, body, { new: true });

        if (!result) throw createError(404);
    } else if (userRole === 'USER') {
        let todo = await Todo.findById(id).find({ userId: userId });

        if (todo.length) {
            result = await Todo.findByIdAndUpdate(id, body, { new: true });
        }

        if (!result) throw createError(403);
    }

    return result
}

export {
    getTodos,
    addTodo,
    getTodo,
    deleteTodo,
    editTodo
};