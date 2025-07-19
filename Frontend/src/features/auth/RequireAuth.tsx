import { Navigate, useLocation } from "react-router"
import Layout from "../../pages/Layout"
import { useSelection } from "../../hooks/useSelections"


const RequireAuth = (allowedRoles: number []) => {
    const { newCredentials } = useSelection() //role assignment and verification?? 
    const location = useLocation()

    if(!newCredentials?.accessToken) {
        return  <Navigate to={'login'} state={{from : location}} replace/> 
    }

    const { roles } = newCredentials 

    return(
        roles?.find(role => allowedRoles.includes(role))
        ? <Layout/> 
        : <Navigate to={'home'} state={{from: location}} replace/> 
        //go to unauthorized!! 
    ) }
}

export default RequireAuth