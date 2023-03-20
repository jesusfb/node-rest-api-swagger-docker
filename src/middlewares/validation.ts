import {Request, Response, NextFunction} from "express";
type Validation = (schema: any)  =>  (req: Request, res: Response, next: NextFunction) => void | ReturnType<never>;

const validation: Validation = (schema: any) => {

    const func = (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body);
        if (error) {
            error.status = 400;
            return next(error);
        }
        next();
    }

    return func;
}

export default validation;