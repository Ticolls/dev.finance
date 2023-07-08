"use client"

import { FormEvent, useState } from "react"
import "./signin.css"
import { useAuth } from "../hooks/useAuth";
import { redirect } from "next/navigation";

export default function Sigin() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const { signinUser } = useAuth()

    async function submitForm(e: FormEvent) {
        e.preventDefault();

        try {
            const res = await signinUser({ name, email, password })
            console.log(res)
            redirect("/login")
        } catch (err) {
            console.log(err)
        }

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