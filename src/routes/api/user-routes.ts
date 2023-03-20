import express from "express";
import {
    getUsers,
    addUser,
    getUser,
    deleteUser,
    editUser
} from '../../controllers/user-controller';

import {schemas} from "../../models/User";
import {isValidId, validation} from "../../middlewares";
import {ctrlWrapper} from "../../helpers";

const router = express.Router();

router.get('/', ctrlWrapper(getUsers));
router.post('/', validation(schemas.userAdd), ctrlWrapper(addUser));
router.get('/:id', isValidId, ctrlWrapper(getUser));
router.delete('/:id', isValidId, ctrlWrapper(deleteUser));
router.patch('/:id', isValidId, validation(schemas.userUpdate), ctrlWrapper(editUser));

export default router;
