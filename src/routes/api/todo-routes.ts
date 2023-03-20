import express from "express";
import {
    getTodos, 
    addTodo,
    getTodo,
    deleteTodo,
    editTodo
} from '../../controllers/todo-controller';

import {schemas} from "../../models/Todo";
import {isValidId, validation} from "../../middlewares";
import {ctrlWrapper} from "../../helpers";

const router = express.Router();

router.get('/', ctrlWrapper(getTodos));
router.post('/', validation(schemas.todoAdd), ctrlWrapper(addTodo));
router.get('/:id', isValidId, ctrlWrapper(getTodo));
router.delete('/:id', isValidId, ctrlWrapper(deleteTodo));
router.patch('/:id', isValidId, validation(schemas.todoUpdate), ctrlWrapper(editTodo));

export default router;
