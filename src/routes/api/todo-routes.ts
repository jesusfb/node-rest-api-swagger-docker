import express from "express";
import {
    getTodos, 
    addTodo,
    getTodo,
    deleteTodo,
    editTodo
} from '../../controllers/todo-controller';

import {schemas} from "../../models/Todo";
import {isAuth, isValidId, validation} from "../../middlewares";
import {ctrlWrapper} from "../../helpers";

const router = express.Router();

router.get('/', isAuth, ctrlWrapper(getTodos));
router.post('/', isAuth, validation(schemas.todoAdd), ctrlWrapper(addTodo));
router.get('/:id', isAuth, isValidId, ctrlWrapper(getTodo));
router.delete('/:id', isAuth, isValidId, ctrlWrapper(deleteTodo));
router.patch('/:id', isAuth, isValidId, validation(schemas.todoUpdate), ctrlWrapper(editTodo));

export default router;
