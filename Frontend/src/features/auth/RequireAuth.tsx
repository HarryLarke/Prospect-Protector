import { Navigate, useLocation } from "react-router"
import Layout from "../../pages/Layout"
import { useSelection } from "../../hooks/useSelections"

import type { RequireAuthProps } from "../../types/auth"


const RequireAuth = ({allowedRoles}: RequireAuthProps)=> {
    const { newCredentials } = useSelection() //role assignment and verification?? 
    const location = useLocation()

    if(!newCredentials?.accessToken) {
        return  <Navigate to={'login'} state={{from : location}} replace /> 
    }

    let userRoles 
    const { roles } = newCredentials
    if(roles) {

        userRoles = roles 
        return (
        userRoles?.find(role => allowedRoles.includes(role))
        ? <Layout/> 
        : <Navigate to={'home'} state={{from: location}} replace/> 
        )   
    } else return  <Navigate to={'login'} state={{from : location}} replace /> 

}


export default RequireAuth