import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: userCredentials => ({
                url: '/auth',
                method: 'POST',
                body: userCredentials 
            })
        })
    })
})