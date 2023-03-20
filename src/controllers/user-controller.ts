import User from "../models/User";
import {Request, Response} from "express";

import { createError } from "../helpers/index";
import { IRequestWithUserId } from '../interfaces';

import { userDto } from '../dto';

const getUsers = async (req: IRequestWithUserId, res: Response): Promise<void>  => {
    const { userId, userRole } = req;
    let result;

    if (userRole == 'ADMIN') {
        result = await User.find();
    } else {
        result = await User.findById(userId);
    }

    result = await User.find();

    res.json(result);
}

const addUser = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const { userRole } = req;
    let result;

    if (userRole == 'ADMIN') {
        result = await User.create(req.body);
    } else if (userRole === 'USER') {
        throw createError(400, "You don't have access")
    }

    res.status(201).json(result);
}

const getUser = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const { id } = req.params;
    const { userId, userRole } = req;
    let result;

    if (userRole == 'ADMIN' || userId?.toString() === id) {
        result = await User.findById(id);
    }

    if (!result) {
        throw createError(404, "Not found")
    }
    res.json(result);
}

const deleteUser = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const { id } = req.params;
    const { userRole } = req;
    let result;

    if (userRole == 'ADMIN') {
        result = await User.findByIdAndDelete(id);
    } else if (userRole === 'USER') {
        throw createError(400, "You don't have access")
    }

    if (!result) {
        throw createError(404, "Not found")
    }

    res.status(200).json({
        message: "user deleted"
    })
}

const editUser = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const { id } = req.params;
    const { userId, userRole } = req;
    let result;

    if (userRole == 'ADMIN' || userId?.toString() === id) {
        result = await User.findByIdAndUpdate(id, req.body, { new: true });
    }

    if (!result) throw createError(404, "Not found");
    res.status(200).json(userDto(result));
}

export {
    getUsers,
    addUser,
    getUser,
    deleteUser,
    editUser
};
