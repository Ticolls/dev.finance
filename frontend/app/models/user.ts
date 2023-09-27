export type User = {
    name: string,
    email: string,
    password: string
}

export type SignupUser = {
    name: string,
    email: string,
    password: string
}

export type LoginUser = {
    email: string,
    password: string
}

export type ResponseLoginUser = {
    name: string,
    email: string
}