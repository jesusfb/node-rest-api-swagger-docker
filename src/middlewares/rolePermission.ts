import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../../config";
import type { JwtPayload } from "jsonwebtoken"

import { createError } from "../helpers/index";

const rolePermission = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (req.method === 'OPTIONS') {
            next()
        }

        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            throw createError(403, 'User not authorized');
        }

        const { role: userRole } = jwt.verify(token, SECRET) as JwtPayload;

        let hasRole = false;

        if (roles.includes(userRole)) {
            hasRole = true;
        } else {
            throw createError(403, `You don't have access`);
        }

        next();
    }
}

export default rolePermission;