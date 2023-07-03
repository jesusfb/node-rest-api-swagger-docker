import express, {Express, Request, Response, NextFunction} from "express";
import cors from "./middlewares/cors";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import todoRoutes from "./routes/todo.router";
import userRoutes from "./routes/user.router";
import authRoutes from "./routes/auth.router";

import { RequestError } from './interfaces';

const app: Express = express();

const swaggerDocument = YAML.load('./public/swagger.yml');

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/ping", (req, res) => {
    res.json({message: "TodoListService.Version1.0.0"});
});

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

export default app;