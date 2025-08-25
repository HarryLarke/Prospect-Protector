import { apiSlice } from "../api/apiSlice";

import type { AuthRequest, LoginResponse} from "../../types/auth";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, AuthRequest>({
            query: (userCredentials) => ({
                url: '/auth',
                method: 'POST',
                body: userCredentials 
            })
        }),
        register: builder.mutation<AuthRequest, {username: string, pwd: string}>({
            query: ({username, pwd}) => ({
                url: '/reg',
                method: 'POST',
                body: {username, pwd}
            })
        }),
        logout: builder.query({
            query: () => ({
                url: '/logout',
                method: 'GET'
            })
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useLogoutQuery } = authApiSlice 