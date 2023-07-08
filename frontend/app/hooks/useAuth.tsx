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
    const { token, setToken } = useContext(AuthContext)

    async function signinUser(user: SigninUserType) {
        const res = await fetch("http://localhost:8080/auth/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user),
        });

        if (!res.ok) {
            throw new Error("Erro no signin do usuário")
        }

        return await res.json()
    }

    async function loginUser(user: LoginUserType) {
        const res = await fetch("http://localhost:8080/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user),
        });

        console.log(await res.json())

        if (!res.ok) {
            throw new Error("Erro no login do usuário")
        }

        return await res.json()
    }


    return { token, setToken, signinUser, loginUser }
}