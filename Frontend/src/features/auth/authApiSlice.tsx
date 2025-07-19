import { apiSlice } from "../api/apiSlice";

import type { UserCredentials } from "../../types/auth";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<UserCredentials, {username: string, pwd: string}>({
            query: (userCredentials) => ({
                url: '/auth',
                method: 'POST',
                body: userCredentials 
            })
        }),
    })
})

export const { useLoginMutation } = authApiSlice