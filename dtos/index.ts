export interface CreateUser {
    username: string
    email: string
    password: string
    accessToken: any
}

export interface LoginUser {
    email: string
    password: string
}