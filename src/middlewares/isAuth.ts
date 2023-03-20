import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../../config";
import { createError } from "../helpers/index";
import type { JwtPayload } from "jsonwebtoken"

import { IRequestWithUserId } from '../interfaces';

const isAuth = (req: IRequestWithUserId, res: Response, next: NextFunction): void => { 
    if (req.method === 'OPTIONS') {
        next()
    }
 
    try {
        const token = req.headers.authorization?.split(' ')[1];;

        if (!token) {
            throw createError(403, 'Пользователь не авторизован');
        }
  
        const { id, role } = jwt.verify(token, SECRET) as JwtPayload;

        req.userId = id;
        req.userRole = role;
        next();
    } catch (e) {
        console.log(e);
        throw createError(403, 'Пользователь не авторизован');
    }
}

export default isAuth;