import { Request, Response, NextFunction } from "express";

const cors = (req: Request, res: Response, next: NextFunction): void => { 
    if (req.method === 'OPTIONS') {
        next()
    }
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Headers', 'Content-type');
    if (req.method === 'OPTIONS') {
        res.append('Access-Allow-Control-Methods', 'PUT,DELETE,POST,PATCH,GET');
        res.sendStatus(200);
    } else {
        next();
    }
};

export default cors;
