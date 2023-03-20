import express from "express";
import { getUsers } from '../../controllers/user-controller';
import {isAuth, rolePermission } from "../../middlewares";
import {ctrlWrapper} from "../../helpers";

import {
    registration,
    login
} from '../../controllers/auth-controller';

const router = express.Router();

router.post('/registration', ctrlWrapper(registration));
router.post('/login', [], ctrlWrapper(login));
router.get('/users', isAuth, rolePermission(['ADMIN']), ctrlWrapper(getUsers));

export default router;