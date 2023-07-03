import express from "express";
import {
    getUsers,
    addUser,
    getUser,
    deleteUser,
    editUser
} from '../controllers/user.controller';

import {schemas} from "../models/User";
import {isAuth, isValidId, validation} from "../middlewares";
import ctrlWrapper from "../helpers/errors/ctrlWrapper";

const router = express.Router();

router.get('/', isAuth, ctrlWrapper(getUsers));
router.post('/', isAuth, validation(schemas.userAdd), ctrlWrapper(addUser));
router.get('/:id', isAuth, isValidId, ctrlWrapper(getUser));
router.delete('/:id', isAuth, isValidId, ctrlWrapper(deleteUser));
router.patch('/:id', isAuth, isValidId, validation(schemas.userUpdate), ctrlWrapper(editUser));

export default router;
