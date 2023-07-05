import dotenv from 'dotenv';
dotenv.config();

const PORT: number | undefined = process.env.NODE_ENV === 'test' ? Number(process.env.NODE_LOCAL_PORT) : Number(process.env.NODE_DOCKER_PORT);
const MONGO_URI: string = (process.env.NODE_ENV === 'test' ? process.env.MONGO_LOCAL_URI : process.env.MONGO_DOCKER_URI) || '';
const JWT_SECRET: string = process.env.JWT_SECRET || '';
const BCRYPT_SALT: number = Number(process.env.BCRYPT_SALT);
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL = process.env.EMAIL;
const GOOGLE_GEN_PASSWORD = process.env.GOOGLE_GEN_PASSWORD;
const FROM_EMAIL = process.env.FROM_EMAIL;

export  {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    BCRYPT_SALT,
    EMAIL_HOST,
    EMAIL,
    GOOGLE_GEN_PASSWORD,
    FROM_EMAIL
}