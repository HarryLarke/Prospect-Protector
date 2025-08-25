export interface AuthRequest {
    username: string,
    pwd: string
}

export interface LoginResponse {
    user: string,
    roles: Roles,
    accessToken: string,
} 

export interface Roles {
    user: number,
    editor: number,
    admin: number
}

export interface Credentials {
    user: string | null, 
    roles: number[] | null, 
    accessToken: string | null
}

export interface AuthState {
    credentials: Credentials | null
}

export interface UserCredentials {
    username: string,
    pwd: string, 
}

export interface RefreshResponse {
    data: {
        user: string, 
        roles: Roles,
        accessToken: string
    }
}

export interface RequireAuthProps {
    allowedRoles : number[]
}