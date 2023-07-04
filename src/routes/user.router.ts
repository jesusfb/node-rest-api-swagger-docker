import express from "express";
import {
    getUsersController,
    addUserController,
    getUserByIdController,
    deleteUserController,
    editUserController
} from '../controllers/user.controller';

import {schemas} from "../models/User";
import {isAuth, isValidId, validation} from "../middlewares";
import ctrlWrapper from "../helpers/errors/ctrlWrapper";

const router = express.Router();

router.get('/', isAuth, ctrlWrapper(getUsersController));
router.post('/', isAuth, validation(schemas.userAdd), ctrlWrapper(addUserController));
router.get('/:id', isAuth, isValidId, ctrlWrapper(getUserByIdController));
router.delete('/:id', isAuth, isValidId, ctrlWrapper(deleteUserController));
router.patch('/:id', isAuth, isValidId, validation(schemas.userUpdate), ctrlWrapper(editUserController));

export default router;
