import { useSelector, useDispatch } from "react-redux";


import { type AppDispatch, type RootState } from '../app/store';
import type { Credentials } from '../types/auth'

import { setCredentials, logout } from '../features/auth/authSlice'


export const useSelection = () => {
    
    const dispatch = useDispatch<AppDispatch>()
    const newCredentials = useSelector((state: RootState) => {
        state.auth.user,
        state.auth.roles,
        state.auth.accessToken}) 

    const setNewCredentials = (user: string, roles: number[], accessToken: string) => {
        dispatch(setCredentials({user, roles, accessToken}))
    }

    const clearCrendentials = () => {
        dispatch(logout())
    }

    return {
        newCredentials,
        
        setNewCredentials,
        clearCrendentials
    }
    
}