import { Response} from "express";
import { IRequestWithUserId } from '../interfaces';

import {
    getUsers,
    addUser,
    getUser,
    deleteUser,
    editUser
} from "../services/user.service";

const getUsersController = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const getUsersService = await getUsers(
        req.userId, 
        req.userRole
    );
    res.status(200).json(getUsersService);
}

const addUserController = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const addUserService = await addUser(
        req.userRole,
        req.body.username,
        req.body.password,
        req.body.role,
        req.body.email,
        req.body.firstname,
        req.body.lastname
    );
    res.status(201).json(addUserService);
}

const getUserByIdController = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const getUserByIdService = await getUser(
        req.params.id,
        req.userId,
        req.userRole
    );
    res.status(200).json(getUserByIdService);
}

const deleteUserController = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const deleteUserService = await deleteUser(
        req.params.id,
        req.userRole
    );
    res.status(200).json(deleteUserService);
}

const editUserController = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const editUserService = await editUser(
        req.params.id,
        req.userId,
        req.userRole,
        req.body
    );
    res.status(200).json(editUserService);
}

export {
    getUsersController,
    addUserController,
    getUserByIdController,
    deleteUserController,
    editUserController
};
