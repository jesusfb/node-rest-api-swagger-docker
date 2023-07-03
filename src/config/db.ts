import mongoose from "mongoose";
import { MONGO_URI } from './';

const connection = async () => {
    await mongoose
        .set('useNewUrlParser', true)
        .set('useFindAndModify', false)
        .set('useCreateIndex', true)
        .connect(
            MONGO_URI, 
            {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true}
        )
        .then(() => console.log('DataBase connected...'))
        .catch((err: any): void => console.log(err))
};

export {
    connection
}
