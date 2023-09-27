import { api } from ".";
import { ResponseDTO } from "../models/response";
import { LoginUser, ResponseLoginUser, SignupUser } from "../models/user";

export async function signin(user: SignupUser): Promise<void> {

    const res: ResponseDTO = (await api.post("/auth/signup", user, {withCredentials: true})).data;

    if (!res.success) {
        throw new Error(res.message);
    }
}

export async function login(user: LoginUser): Promise<ResponseLoginUser> {

    const res: ResponseDTO = (await api.post("/auth/login", user, {withCredentials: true})).data;


    if (!res.success) {
        throw new Error(res.message);
    }

    const userDTO: ResponseLoginUser = res.data;

    return userDTO;
}