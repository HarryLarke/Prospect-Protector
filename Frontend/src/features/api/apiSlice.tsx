import { createApi, fetchBaseQuery, type FetchBaseQueryError, type FetchBaseQueryMeta, type QueryReturnValue } from "@reduxjs/toolkit/query/react";
import { useSelection } from "../../hooks/useSelections";



//URL: will change, potentially sourced from the dotenv file...
const { newCredentials, setNewCredentials, clearCrendentials } = useSelection() 

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500', 
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = newCredentials?.accessToken
        if(token) {
            headers.set("authorization", `Bearer ${token}`)
        } return headers
    }
})

//Auth info is being sent here?? or secondar part of the auth?? 
const baseQueryWithReauth = async (args, api, extraOptions,) => {
    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.status === 403) {
        console.log('Requesting new token...')

        const refreshResult: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta> = await baseQuery('/refresh', api, extraOptions)
        if(refreshResult?.data) {
            const newCredentials = {
                user: refreshResult.data.user,
                roles: refreshResult.data.roles,
                accessToken: refreshResult.data.accessToken}
                //Will need to double check these types of cast correctly onto the data and what not! 
                //Whatever, the credentials should be set when calling the refreshtoken as in the cookies and the AT will be sent in the headers!
            setNewCredentials(newCredentials)

            result = await baseQuery(args, api, extraOptions)
        } else{
            clearCrendentials()
        }
    }
    console.log(result)
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Auth', 'Users'],
    endpoints: () => ({})
})

