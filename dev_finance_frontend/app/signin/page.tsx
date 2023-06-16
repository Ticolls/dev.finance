"use client"

import { FormEvent, useState } from "react"
import "./signin.css"

export default function Sigin() {
    const [name, setName] = useState<String>("");
    const [email, setEmail] = useState<String>("");
    const [password, setPassword] = useState<String>("");
    const [confirmPassword, setConfirmPassword] = useState<String>("");

    async function submitForm(e: FormEvent) {
        e.preventDefault();

        const res = await fetch("http://localhost:8080/user/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        console.log(res);
    }

    return (
        <div className="signin-container">
            <h1 className="signin-title">Sign in</h1>
            <form className="signin-form" action="">

                <div className="input-group">
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirmar senha</label>
                    <input type="password" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <button className="button" onClick={submitForm}>Sign in</button>
            </form>
        </div>
    )
}