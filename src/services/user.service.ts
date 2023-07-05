import { Types } from 'mongoose';
import { User } from "../models/User";
import createError from '../helpers/errors/createError';

const getUsers = async (userId: Types.ObjectId | undefined, userRole: string | undefined) => {
    let result;

    if (userRole == 'ADMIN') {
        result = await User.find();
    } else {
        result = await User.findById(userId);
    }

    return result
}

const addUser = async (userRole: string | undefined, username: string, password: string, role: string, 
        email: string, firstname: string, lastname: string) => {

    if (userRole == 'ADMIN') {
        let user = await User.findOne({ username });

        if (user) {
            throw createError(400, `User ${username} already exists`);
        }

        user = new User({username, password, role, email, firstname, lastname});

        const result = await user.save();

        return result
    }  else if (userRole === 'USER') {
        throw createError(403);
    }
}

const getUser = async (id: string, userId: Types.ObjectId | undefined, userRole: string | undefined) => {
    let result;
    
    if (userRole == 'ADMIN' || userId?.toString() === id) {
        result = await User.findById(id);
    }

    if (!result) throw createError(404);

    return result;
}

const deleteUser = async (id: string, userRole: string | undefined) => {
    let result;

    if (userRole == 'ADMIN') {
        result = await User.findByIdAndDelete(id);
    } else if (userRole === 'USER') {
        throw createError(403);
    }

    if (!result) throw createError(404);

    return {message: "user deleted"}
}

const editUser = async (id: string, userId: Types.ObjectId | undefined, 
        userRole: string | undefined, body: any) => {
    let result;

    if (userRole == 'ADMIN' || userId?.toString() === id) {
        result = await User.findByIdAndUpdate(id, body, { new: true });
    }

    if (!result) throw createError(404);
    
    return result
}

export {
    getUsers,
    addUser,
    getUser,
    deleteUser,
    editUser
};