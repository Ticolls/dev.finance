"use client"

import { FormEvent, useState } from "react"
import "./signup.css"
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";

import { z } from "zod"
import { Loading } from "@/app/components/loading/Loading";
import Link from "next/link";


type ErrorsType = {
    name: { message: string } | null,
    email: { message: string } | null,
    password: { message: string } | null,
    confirmPassword: { message: string } | null,
}

export default function Signup() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);


    const [errors, setErrors] = useState<ErrorsType>({ name: null, email: null, password: null, confirmPassword: null });

    const { signinUser } = useAuth();

    const router = useRouter();

    const createUserFormSchema = z.object({
        email: z.string().email("Digite um email válido."),
        name: z.string()
            .nonempty("Campo obrigatório."),
        password: z.string()
            .nonempty("Campo obrigatório.")
            .regex(new RegExp("(?=.*[0-9])(?=.*[a-z])(?=\\S+$).{8,}$"), "A senha deve conter 8 caracteres, pelo menos uma letra minúscula e um número"),
        confirmPassword: z.string()
            .nonempty("Campo obrigatório.")
    })
        .refine(({ password, confirmPassword }) => password === confirmPassword, {
            message: "as senhas devem ser iguais.",
            path: ["confirmPassword"]
        });

    async function submitForm(e: FormEvent) {
        e.preventDefault();

        const validationResponse = createUserFormSchema.safeParse({ name, email, password, confirmPassword })

        if (validationResponse.success) {
            try {
                setLoading(true);
                await signinUser({ name, email, password });
                setLoading(false);

                router.replace("/login");

            } catch (err) {

                setLoading(false);
                setErrors({ name: null, email: { message: "Email já cadastrado." }, password: null, confirmPassword: null })
            }
        } else {
            const zodErrors = validationResponse.error.errors;

            const errors: ErrorsType = { name: null, email: null, password: null, confirmPassword: null };

            for (let zodError of zodErrors) {
                if (zodError.path[0] == "name") {
                    errors.name = { message: zodError.message };
                }
                if (zodError.path[0] == "email") {
                    errors.email = { message: zodError.message };
                }
                if (zodError.path[0] == "password") {
                    errors.password = { message: zodError.message };
                }
                if (zodError.path[0] == "confirmPassword") {
                    errors.confirmPassword = { message: zodError.message };
                }
            }

            setErrors(errors);
        }
    }

    return (
        <div className="signin-container">
            <h1 className="signin-title">Sign in</h1>
            <form className="signin-form" action="">

                <div className="input-group">
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>

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

                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirmar senha</label>
                    <input type="password" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                </div>

                <button className="button" onClick={submitForm}>{loading ? <Loading /> : "Sign in"}</button>
            </form>

            <p className="redirect">Já tem uma conta? clique <Link className="redirect-link" href="/login">aqui</Link> para fazer login.</p>
        </div>
    )
}