import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit' 

import type { Credentials } from '../../types/auth'

const initialState: Credentials = {
    user: null,
    roles: null,
    accessToken: null
} 

const authSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {
        setCredentials(state, action:PayloadAction<Credentials>) {
            const { user, roles, accessToken} = action.payload 
            state.user = user, 
            state.roles = roles,
            state.accessToken = accessToken
        },
        
        logout: (state) => {
            state.user = null, 
            state.roles = null,
            state.accessToken = null
        }  
    }
})

export const {
    setCredentials,
    logout
} = authSlice.actions 

export default authSlice.reducer

//Don't know if the state will be extracted from AT at some point? If not all these details are handing into the AT
//Don't know about the the RT too? 
//Do I need to show types at some point too? 

//User hooks to simpilify? 

//I'm abit concerned whethert the credentials will clear??
