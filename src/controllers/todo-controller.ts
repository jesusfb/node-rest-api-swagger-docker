import Todo from "../models/Todo";
import { ITodo } from '../interfaces';
import {Request, Response} from "express";

import { createError } from "../helpers/index";

const getTodos = async (req: Request, res: Response): Promise<void>  => {
    const result = await Todo.find();
    res.json(result);
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    const result: ITodo = await Todo.create(req.body);
    const todo: ITodo = {
        title: result.title,
        body: result.body
    }
    res.status(201).json(todo);
}

const getTodo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await Todo.findById(id);

    if (!result) {
        throw createError(400, "Not found")
    }
    res.json(result);
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await Todo.findByIdAndDelete(id);

    if (!result) {
        throw createError(400, "Not found")
    }

    res.status(200).json({
        message: "todo deleted"
    })
}

const editTodo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result: ITodo | null = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) throw createError(404, "Not found");
    res.status(200).json(result);
}

export {
    getTodos,
    addTodo,
    getTodo,
    deleteTodo,
    editTodo
};
