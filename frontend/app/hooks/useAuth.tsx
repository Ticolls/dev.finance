"use client"

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

type SigninUserType = {
    name: string,
    email: string,
    password: string,
}

type LoginUserType = {
    email: string,
    password: string,
}

export function useAuth() {
    const { token, setToken } = useContext(AuthContext);

    async function signinUser(user: SigninUserType) {
        const res = await fetch("http://localhost:8080/auth/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const json = await res.json();

        if (!json.success) {
            throw new Error("Erro no signin do usuário");
        }

        return res.status;
    }

    async function loginUser(user: LoginUserType) {

        let authorized = false

        const res = await fetch("http://localhost:8080/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!res.ok) {
            throw new Error("Erro no login do usuário");
        }

        const data = await res.json();

        return authorized;
    }


    return { token, setToken, signinUser, loginUser };
}