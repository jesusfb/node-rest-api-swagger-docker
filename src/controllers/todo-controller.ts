import Todo from "../models/Todo";
import { ITodo, IRequestWithUserId } from '../interfaces';
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

    res.json(result);
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
        result = await Todo.findById(id);
    } else {
        result = await Todo.findById(id).find({ userId: userId });
    }

    if (result.length == 0 || !result) {
        throw createError(404, "Not found")
    }
    
    res.json(result);
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
        throw createError(404, "Not found")
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

    if (!result) throw createError(404, "This is not your todo");
    res.status(200).json(todoDto(result));
}

export {
    getTodos,
    addTodo,
    getTodo,
    deleteTodo,
    editTodo
};
