import dotenv from 'dotenv';
dotenv.config();

const PORT: number = Number(process.env.PORT) || 3001;
const MONGO_URL: string = process.env.MONGO_URL || '';
const SECRET: string = process.env.SECRET || '';

export  {
    SECRET,
    PORT,
    MONGO_URL
}