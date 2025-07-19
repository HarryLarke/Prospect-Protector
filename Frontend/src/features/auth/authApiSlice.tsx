import { apiSlice } from "../api/apiSlice";

import type { LoginRequest, LoginResponse} from "../../types/auth";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (userCredentials) => ({
                url: '/auth',
                method: 'POST',
                body: userCredentials 
            })
        }),
    })
})

export const { useLoginMutation } = authApiSlice