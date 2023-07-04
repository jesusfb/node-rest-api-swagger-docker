import mongoose from "mongoose";
import { MONGO_URI } from './';

const connection = async () => {
    await mongoose
        .connect(MONGO_URI)
        .then(() => console.log('DataBase connected...'))
        .catch((err: any): void => console.log(err))
};

export {
    connection
}
