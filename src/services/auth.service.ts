import crypto from "crypto";
import bcrypt from "bcrypt";

import { User } from "../models/User";
import Token from "../models/Token";
import generateAccessToken from '../helpers/auth/generateAccessToken';
import createError from '../helpers/errors/createError';
import { BCRYPT_SALT }from '../config';
import sendEmail from "../utils/email/sendEmail";

const registration = async (username: string, password: string, role: string, 
        email: string, firstname: string, lastname: string) => {
    let user = await User.findOne({ username });

    if (user) {
        throw createError(400, `User ${username} already exists`);
    }
    
    user = new User({username, password, role, email, firstname, lastname});

    const token = generateAccessToken(user._id, user.role);
  
    if (token) {
        await user.save();
        return {_id: user._id, username, password, role, email, firstname, lastname, token}
    } else {
         throw createError(400, 'Token error');
    }
};

const login = async (username: string, password: string) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw createError(404, `User ${username} not found`);
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
        throw createError(400, 'Wrong password entered');
    }

    const token = generateAccessToken(user._id, user.role);
  
    if (token) {
        return { token: token, userId: user._id }
    } else {
        throw createError(400, 'Token error');
    }  
}

const passwordResetRequest = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) throw createError(400, "Email does not exist")

    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, BCRYPT_SALT);

    await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save();

    sendEmail(
        user.email,
        "Password Reset Request",
        `${user.username}, you have sent a password reset request.`
    );
    return { userId: user._id, token: resetToken };
};

const resetPassword = async (userId: string, token: string, password: string) => {
    let passwordResetToken = await Token.findOne({ userId });

    if (!passwordResetToken) {
        throw createError(400, "Invalid or expired password reset token")
    }

    console.log(passwordResetToken.token, token);

    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if (!isValid) {
        throw createError(400, "Invalid or expired password reset token")
    }

    const hash = await bcrypt.hash(password, BCRYPT_SALT);

    await User.updateOne(
        { _id: userId },
        { $set: { password: hash } },
        { new: true }
    );

    const user = await User.findById({ _id: userId });
    if (!user) throw createError(400, "User does not exist")

    sendEmail(
        user.email,
        "Password Reset Successfully",
        `${user.username}, your password has been changed successfully.`
    );

    await passwordResetToken.deleteOne();
    return { message: "Password reset was successful" };
};

export {
    registration,
    login,
    passwordResetRequest,
    resetPassword
};