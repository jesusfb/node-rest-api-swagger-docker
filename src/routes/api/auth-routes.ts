import express from "express";
import { getUsers } from '../../controllers/user-controller';
import {isAuth } from "../../middlewares";
import {ctrlWrapper} from "../../helpers";

import {
    registration,
    login
} from '../../controllers/auth-controller';

const router = express.Router();

router.post('/registration', ctrlWrapper(registration));
router.post('/login', [], ctrlWrapper(login));
router.get('/users', isAuth, ctrlWrapper(getUsers));

export default router;