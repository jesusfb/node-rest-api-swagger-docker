import { ITodo } from '../interfaces';

const userDto = (todo: {title: string; body: string}): ITodo => {
    const result: ITodo = {
        title: todo.title,
        body: todo.body
    }

    return result
}

export default userDto