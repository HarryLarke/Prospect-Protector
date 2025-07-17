import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit' 

import type { AuthState, Credentials } from '../../types/auth'

const initialState: AuthState = {
    credentials: null 
} 

const authSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {
        setCredentials(state, action:PayloadAction<Credentials | null>) {
            state.credentials = action.payload
        },
        
        logout: (state) => {
            state.credentials = null
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
