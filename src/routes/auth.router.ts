import express from "express";
import ctrlWrapper from "../helpers/errors/ctrlWrapper";

import {
    registrationController,
    loginController,
    passwordResetRequestController,
    resetPasswordController
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/registration', ctrlWrapper(registrationController));
router.post('/login', ctrlWrapper(loginController));
router.post("/requestResetPassword", ctrlWrapper(passwordResetRequestController));
router.post("/resetPassword", ctrlWrapper(resetPasswordController));

export default router;