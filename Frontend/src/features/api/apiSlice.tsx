import { createApi, fetchBaseQuery, type FetchBaseQueryError, type QueryReturnValue } from "@reduxjs/toolkit/query/react";

 
import type { LoginResponse } from "../../types/auth"; 
import { logout, setCredentials } from "../auth/authSlice";
 

//URL: will change, potentially sourced from the dotenv file...


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500', 
    credentials: 'include',
    prepareHeaders: (headers, {getState} ) => {
        const token = getState().auth.accessToken
        if(token) {
            headers.set("authorization", `Bearer ${token}`)
        } return headers
    }
})

//Auth info is being sent here?? or secondar part of the auth?? 
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any,) => {
    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.status === 403) {
        console.log('Requesting new token...')

        const refreshResult = await baseQuery('/refresh', api, extraOptions) as QueryReturnValue<LoginResponse, FetchBaseQueryError>
        if(refreshResult?.data) {
            const { user, roles, accessToken } = refreshResult.data
                //Will need to double check these types of cast correctly onto the data and what not! 
                //Whatever, the credentials should be set when calling the refreshtoken as in the cookies and the AT will be sent in the headers!
            api.dispatch(setCredentials({user, roles, accessToken}))

            result = await baseQuery(args, api, extraOptions)
        } else{
            api.dispatch(logout())//Will need to sent a request to the backend too!
        }
    }
    return result 
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Auth', 'Users'],
    endpoints: () => ({})
})
