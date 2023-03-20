import User from "../models/User";
import { IUser } from '../interfaces';
import {Request, Response} from "express";

import { createError } from "../helpers/index";

const getUsers = async (req: Request, res: Response): Promise<void>  => {
    const result = await User.find();
    res.json(result);
}

const addUser = async (req: Request, res: Response): Promise<void> => {
    const result: IUser = await User.create(req.body);
    const user: IUser = {
        username: result.username,
        password: result.password,
        role: result.role,
        email: result.email,
        firstname: result.firstname,
        lastname: result.lastname
    }
    res.status(201).json(user);
}

const getUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await User.findById(id);

    if (!result) {
        throw createError(404, "Not found")
    }
    res.json(result);
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);

    if (!result) {
        throw createError(404, "Not found")
    }

    res.status(200).json({
        message: "user deleted"
    })
}

const editUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result: IUser | null = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) throw createError(404, "Not found");
    res.status(200).json(result);
}

export {
    getUsers,
    addUser,
    getUser,
    deleteUser,
    editUser
};
