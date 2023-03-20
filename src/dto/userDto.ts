import { IUser } from '../interfaces';

const userDto = (user: { username: string;  password: string;  role: string; email: string; firstname: string; lastname: string}): IUser => {
    const result: IUser = {
        username: user.username,
        password: user.password,
        role: user.role,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
    }

    return result
}

export default userDto