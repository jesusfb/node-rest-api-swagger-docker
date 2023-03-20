import { ITodo } from '../interfaces';
import { Types } from 'mongoose';

const todorDto = (todo: {title: string; body: string, userId: Types.ObjectId}): ITodo => {
    const result: ITodo = {
        title: todo.title,
        body: todo.body,
        userId: todo.userId
    }

    return result
}

export default todorDto