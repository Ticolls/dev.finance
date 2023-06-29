"use client"

import { FormEvent, useState } from "react"
import "./login.css"

export default function Login() {
    const [email, setEmail] = useState<String>("");
    const [password, setPassword] = useState<String>("");

    async function submitForm(e: FormEvent) {
        e.preventDefault();

        console.log(email);
        console.log(password);
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