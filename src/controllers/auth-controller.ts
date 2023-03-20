import User from "../models/User";
import {Request, Response} from "express";
import bcrypt from "bcrypt";
import { generateAccessToken } from '../helpers';
import { IUser } from '../interfaces';
import { userDto } from '../dto';

import { createError } from "../helpers/index";

const registration = async (req: Request, res: Response): Promise<void> => {
    const { username, password, role, email, firstname, lastname } = req.body;

    const candidate = await User.findOne({ username });

    if (candidate) {
        throw createError(400, `User ${username} already exists`);
    }

    const hashPassword = bcrypt.hashSync(password, 7);
    const user = new User({ username, password: hashPassword, role, email, firstname, lastname });
    const result = userDto(await user.save());
    
    res.status(201).json(result);
}

const login = async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        throw createError(400, `User ${username} not found`);
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
        throw createError(404, 'Wrong password entered');
    }

    const token = generateAccessToken(user._id, user.role);

    if (token) {
        res.json({ token });
    } else {
        throw createError(400, 'Token error');
    }  
}

export {
    registration,
    login
};
