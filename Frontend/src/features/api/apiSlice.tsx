import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

//URL: will change, potentially sourced from the dotenv file...
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Users'],
    endpoints: builder => ({})
})

