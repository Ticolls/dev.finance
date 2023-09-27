"use client"

import { FormEvent, useState } from "react"
import "./login.css"
import { useAuth } from "../../hooks/useAuth";
import { redirect, useRouter } from "next/navigation";

import { Loading } from "@/app/components/loading/Loading";

import { z } from "zod"

type ErrorsType = {
    email: { message: string } | null,
    password: { message: string } | null,
}

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [errors, setErrors] = useState<ErrorsType>({ email: null, password: null });

    const { loginUser } = useAuth();

    const router = useRouter();

    const loginUserFormSchema = z.object({
        email: z.string().email("Digite um email válido."),
        password: z.string().nonempty("Campo obrigatório."),
    })

    async function submitForm(e: FormEvent) {
        e.preventDefault();

        const validationResponse = loginUserFormSchema.safeParse({ email, password });

        if (validationResponse.success) {
            try {
                setLoading(true);
                const user = await loginUser({ email, password });
                setLoading(false);

                if (user) {
                    router.replace("/finances");
                }

            } catch (err) {
                console.log(err);
                setLoading(false);
                setErrors({ email: { message: "Usuário ou senha incorretos." }, password: null })
            }
        } else {
            const zodErrors = validationResponse.error.errors;

            const errors: ErrorsType = { email: null, password: null };

            for (let zodError of zodErrors) {
                if (zodError.path[0] == "email") {
                    errors.email = { message: zodError.message };
                }
                if (zodError.path[0] == "password") {
                    errors.password = { message: zodError.message };
                }
            }

            setErrors(errors);
        }
    }

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>

            <form className="login-form" action="">
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>

                <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                <button className="button" onClick={submitForm}>{loading ? <Loading /> : "Login"}</button>
            </form>
        </div>
    )
}