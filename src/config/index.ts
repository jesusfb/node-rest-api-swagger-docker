import dotenv from 'dotenv';
dotenv.config();

const PORT: number | undefined = process.env.NODE_ENV === 'test' ? Number(process.env.NODE_LOCAL_PORT) : Number(process.env.NODE_DOCKER_PORT);
const MONGO_URI: string = (process.env.NODE_ENV === 'test' ? process.env.MONGO_LOCAL_URI : process.env.MONGO_DOCKER_URI) || '';
const JWT_SECRET: string = process.env.JWT_SECRET || '';
const MONG0_LOCAL = process.env.MONG0_LOCAL;
const BCRYPT_SALT: number = Number(process.env.BCRYPT_SALT);
const CLIENT_URL = process.env.CLIENT_URL;

export  {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    MONG0_LOCAL,
    BCRYPT_SALT,
    CLIENT_URL
}