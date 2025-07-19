export interface UserCredentials {
    username: string,
    pwd: string
}

export interface Roles {
    find(arg0: (role: any) => boolean): unknown
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

export interface RefreshResponse {
    data: {
        user: string, 
        roles: Roles,
        accessToken: string
    }
}