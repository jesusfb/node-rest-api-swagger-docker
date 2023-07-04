import express from "express";
import {
    getTodosController, 
    addTodoController,
    getTodoByIdController,
    deleteTodoController,
    editTodoController
} from '../controllers/todo.controller';

import {schemas} from "../models/Todo";
import {isAuth, isValidId, validation} from "../middlewares";
import ctrlWrapper from "../helpers/errors/ctrlWrapper";

const router = express.Router();

router.get('/', isAuth, ctrlWrapper(getTodosController));
router.post('/', isAuth, validation(schemas.todoAdd), ctrlWrapper(addTodoController));
router.get('/:id', isAuth, isValidId, ctrlWrapper(getTodoByIdController));
router.delete('/:id', isAuth, isValidId, ctrlWrapper(deleteTodoController));
router.patch('/:id', isAuth, isValidId, validation(schemas.todoUpdate), ctrlWrapper(editTodoController));

export default router;
