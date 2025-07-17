import { useSelector, useDispatch } from "react-redux";


import type { RootState, AppDispatch } from '../app/store';
import type { Credentials } from '../types/auth'

import { setCredentials, logout } from '../features/auth/authSlice'

export const useSelection = () => {
    const dispatch = useDispatch<AppDispatch>()

    const newCredentials = useSelector((state: RootState) => state.auth.credentials) 

    const setNewCredentials = (credentials: Credentials | null) => {
        dispatch(setCredentials(credentials))
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