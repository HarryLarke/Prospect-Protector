export interface UserCredentials {
    username: string,
    pwd: string
}

export interface Roles {
    user: number,
    editor: number,
    admin: number
}

export interface Credentials {
    user: string | null, 
    roles: Roles | null, 
    accessToken: string | null
}

export interface AuthState {
    credentials: Credentials | null
}

export interface UserCredentials {
    username: string,
    pwd: string, 
}