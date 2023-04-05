import Todo from "../models/Todo";
import { IRequestWithUserId } from '../interfaces';
import {Response} from "express";
import { createError } from "../helpers/index";
import { todoDto } from '../dto';

const getTodos = async (req: IRequestWithUserId, res: Response): Promise<void>  => {
    const { userId, userRole } = req;
    let result;

    if (userRole == 'ADMIN') {
        result = await Todo.find();
    } else {
        result = await Todo.find({ userId: userId });
    }

    res.status(200).json(result);
}

const addTodo = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const { userId } = req;
    const result = await Todo.create({...req.body, userId: userId });

    res.status(201).json(result);
}

const getTodo = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const { id } = req.params;
    const { userId, userRole } = req;

    let result: any;

    if (userRole == 'ADMIN') {
        result = [await Todo.findById(id)];
    } else {
        result = await Todo.findById(id).find({ userId: userId });
    }
    
    res.status(200).json(result[0]);
}

const deleteTodo = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const { id } = req.params;
    const { userId, userRole } = req;
    let result;

    if (userRole == 'ADMIN') {
        result = await Todo.findByIdAndDelete(id)
    } else {
        result = await Todo.findOne({ _id: id, userId: userId });
    }

    if (result) {
        await Todo.findByIdAndDelete(id);

        res.status(200).json({
            message: "todo deleted"
        });
    } else {
        throw createError(404);
    }
}

const editTodo = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.userId;
    let result;

    const todo = await Todo.findOne({ _id: id, userId: userId });

    if (todo) {
        result = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    }

    if (!result) throw createError(404);
    res.status(200).json(todoDto(result));
}

export {
    getTodos,
    addTodo,
    getTodo,
    deleteTodo,
    editTodo
};
