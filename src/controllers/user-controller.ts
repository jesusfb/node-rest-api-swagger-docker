import User from "../models/User";
import { Response} from "express";
import { createError } from "../helpers/index";
import { IRequestWithUserId } from '../interfaces';
import { userDto } from '../dto';
import bcrypt from "bcrypt";

const getUsers = async (req: IRequestWithUserId, res: Response): Promise<void>  => {
    const { userId, userRole } = req;
    let result;

    if (userRole == 'ADMIN') {
        result = await User.find();
    } else {
        result = await User.findById(userId);
    }

    res.status(200).json(result);
}

const addUser = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const { userRole } = req;
    const { username, password, role, email, firstname, lastname } = req.body;

    if (userRole == 'ADMIN') {
        const candidate = await User.findOne({ username });

        if (candidate) {
            throw createError(400, `User ${username} already exists`);
        }

        const hashPassword = bcrypt.hashSync(password, 7);
        const user = new User({ username, password: hashPassword, role, email, firstname, lastname });
        const result = await user.save();
        
        res.status(201).json(result);

    } else if (userRole === 'USER') {
        throw createError(403);
    }
}

const getUser = async (req: IRequestWithUserId, res: Response): Promise<void> => {
    const { id } = req.params;
    const { userId, userRole } = req;
    let result;

    if (userRole == 'ADMIN' || userId?.toString() === id) {
        result = await User.findById(id);
    }

    if (!result) {
        throw createError(404);
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
        throw createError(403);
    }

    if (!result) {
        throw createError(404);
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

    if (!result) throw createError(404);
    res.status(200).json(userDto(result));
}

export {
    getUsers,
    addUser,
    getUser,
    deleteUser,
    editUser
};
