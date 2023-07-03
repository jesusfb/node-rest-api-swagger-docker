import express from "express";
import ctrlWrapper from "../helpers/errors/ctrlWrapper";

import {
    registration,
    login
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/registration', ctrlWrapper(registration));
router.post('/login', ctrlWrapper(login));

export default router;