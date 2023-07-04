import { IRequestWithUserId } from '../interfaces';
import {Response} from "express";

import {
    getTodos,
    addTodo,
    getTodo,
    deleteTodo,
    editTodo
} from "../services/todo.service";

const getTodosController = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const getTodosService = await getTodos(
        req.userId,
        req.userRole
    );
    res.status(200).json(getTodosService);
}

const addTodoController = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const addTodoService = await addTodo(
        req.userId,
        req.body.title,
        req.body.body
    );
    res.status(201).json(addTodoService);
}

const getTodoByIdController = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const getTodoByIdService = await getTodo(
        req.params.id,
        req.userId,
        req.userRole
    );
    res.status(200).json(getTodoByIdService);
}

const deleteTodoController = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const deleteUserService = await deleteTodo(
        req.params.id,
        req.userId,
        req.userRole
    );
    res.status(200).json(deleteUserService);
}

const editTodoController = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const editUserService = await editTodo(
        req.params.id,
        req.userId,
        req.userRole,
        req.body
    );
    res.status(200).json(editUserService);
}

export {
    getTodosController,
    addTodoController,
    getTodoByIdController,
    deleteTodoController,
    editTodoController
};
