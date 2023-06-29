import dotenv from 'dotenv';
dotenv.config();

const PORT: number | undefined = process.env.NODE_ENV === 'test' ? Number(process.env.NODE_LOCAL_PORT) : Number(process.env.NODE_DOCKER_PORT);
const MONGO_URI: string = (process.env.NODE_ENV === 'test' ? process.env.MONGO_LOCAL_URI : process.env.MONGO_DOCKER_URI) || '';
const JWT_SECRET: string = process.env.JWT_SECRET || '';

export  {
    JWT_SECRET,
    PORT,
    MONGO_URI
}