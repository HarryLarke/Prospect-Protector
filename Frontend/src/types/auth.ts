export interface Roles {
    user: number,
    editor: number,
    admin: number
}

export interface Auth {
    user: string | null, 
    roles: Roles | null, 
    accessToken: string | null
}