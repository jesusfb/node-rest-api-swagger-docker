import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../../config";
import { createError } from "../helpers/index";

const isAuth = (req: Request, res: Response, next: NextFunction): void => { 
    if (req.method === 'OPTIONS') {
        next()
    }
 
    try {
        const token = req.headers.authorization?.split(' ')[1];;

        if (!token) {
            throw createError(403, 'Пользователь не авторизован');
        }
  
        const decodedData = jwt.verify(token, SECRET);
        // console.log(decodedData);
        
        // req.user: any = decodedData;
        next();
    } catch (e) {
        console.log(e);
        throw createError(403, 'Пользователь не авторизован');
    }
}

export default isAuth;