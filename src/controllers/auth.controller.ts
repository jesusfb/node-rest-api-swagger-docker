import {Request, Response} from "express";
import { IRequestWithUserId } from '../interfaces';

import {
    registration,
    login,
    passwordResetRequest,
    resetPassword
} from "../services/auth.service";

const registrationController = async (req: Request, res: Response): Promise<void> => {
    const signupService = await registration(
        req.body.username,
        req.body.password,
        req.body.role,
        req.body.email,
        req.body.firstname,
        req.body.lastname
    );
    res.status(201).json(signupService);
};

const loginController = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const loginService = await login(
        req.body.username, 
        req.body.password
    );
    req.userId = loginService.userId;
    res.status(200).json({ token: loginService.token });
}

const passwordResetRequestController = async (req: Request, res: Response): Promise<void> => {
    const requestPasswordResetService = await passwordResetRequest(req.body.email);
    res.status(200).json(requestPasswordResetService);
};

const resetPasswordController = async (req: Request, res: Response): Promise<void> => {
    const resetPasswordService = await resetPassword(
        req.body.userId,
        req.body.token,
        req.body.password
    );
    res.status(200).json(resetPasswordService);
};

export {
    registrationController,
    loginController,
    passwordResetRequestController,
    resetPasswordController
};
