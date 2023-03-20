import {SECRET} from '../../config';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const generateAccessToken = (id: Types.ObjectId, role: string): string => {
    const payload = {
        id,
        role,
    }
    return jwt.sign(payload, SECRET, {expiresIn: '24h'});
}

export default generateAccessToken