"use client"

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../api";

type SigninUserType = {
    name: string,
    email: string,
    password: string
}

type LoginUserType = {
    email: string,
    password: string
}

type ResponseDTO = {
    success: boolean,
    message: string,
    data: any
}

type UserDTO = {
    name: string,
    email: string
}

export function useAuth() {
    const { token, setToken } = useContext(AuthContext);

    async function signinUser(user: SigninUserType) {

        const res = (await api.post("/auth/signup", user, {withCredentials: true})).data;

        if (!res.success) {
            throw new Error(res.message);
        }
    }

    async function loginUser(user: LoginUserType) {

        const res = (await api.post("/auth/login", user, {withCredentials: true})).data;


        if (!res.success) {
            throw new Error(res.message);
        }

        const userDTO: UserDTO = res.data;

        return userDTO;
    }


    return { token, setToken, signinUser, loginUser };
}