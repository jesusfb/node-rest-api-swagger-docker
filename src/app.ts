import express, {Express} from "express";
import cors from "cors";
import mongoose from "mongoose";
import {Request, Response, NextFunction} from "express";
import todoRoutes from "./routes/api/todo-routes";
import userRoutes from "./routes/api/user-routes";
import authRoutes from "./routes/api/auth-routes";
import {MONGO_URL, PORT} from '../config';

export interface RequestError extends Error {
    status?: number,
    code?: number
}

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/todos/', todoRoutes);
app.use('/api/users/', userRoutes);
app.use('/api/auth/', authRoutes);

app.use((req: Request, res: Response): void => {
    res.status(404).json({ message: "Not found" })
});

app.use((error:RequestError, req: Request, res:Response, next: NextFunction): void => {
    const {status = 500, message = "Server error"} = error;
    res.status(status).json({message})
});

mongoose
    .connect(MONGO_URL)
    .then(()=> {
        console.log("DataBase connected...")
        app.listen(PORT);
        console.log(`Server running on port ${PORT}`)
    })
    .catch((error): void => {
        console.log(error.message);
        process.exit(1);
    })