import Todo from "../models/Todo";
import { ITodo, IRequestWithUserId } from '../interfaces';
import {Response} from "express";
import { createError } from "../helpers/index";

const getTodos = async (req: IRequestWithUserId, res: Response): Promise<void>  => {
    const userId = req.userId;
    const result = await Todo.find({ userId: userId });
    res.json(result);
}

const addTodo = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const userId = req.userId;
    const result: ITodo = await Todo.create({...req.body, userId: userId });

    const todo: ITodo = {
        title: result.title,
        body: result.body,
        userId: result.userId
    }
    res.status(201).json(todo);
}

const getTodo = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.userId;

    const result = await Todo
        .findById(id)
        .find({ userId: userId });

    if (!result || result.length == 0) {
        throw createError(400, "Not found todo")
    }
    res.json(result);
}

const deleteTodo = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.userId;

    const todo = await Todo.findOne({ _id: id, userId: userId });

    if (todo) {
        await Todo.findByIdAndDelete(id);

        res.status(200).json({
            message: "todo deleted"
        })
    } else {
        throw createError(400, "This is not your todo")
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
    res.status(200).json(result);
}

export {
    getTodos,
    addTodo,
    getTodo,
    deleteTodo,
    editTodo
};
