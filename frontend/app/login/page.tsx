"use client"

import { FormEvent, useState } from "react"
import "./login.css"
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { loginUser, setToken } = useAuth()

    async function submitForm(e: FormEvent) {
        e.preventDefault();

        try {
            const token = await loginUser({ email, password })
            console.log(token)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>

            <form className="login-form" action="">
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button className="button" onClick={submitForm}>Login</button>
            </form>
        </div>
    )
}