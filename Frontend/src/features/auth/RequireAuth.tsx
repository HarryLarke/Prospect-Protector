import { Navigate, useLocation } from "react-router"
import Layout from "../../pages/Layout"
import { useSelection } from "../../hooks/useSelections"


const RequireAuth = () => {
    const { newCredentials } = useSelection() //role assignment and verification?? 

    return(
        newCredentials 
        ?
        <Layout/>
        : 
        <Navigate to={'login'} state={{from : location}} replace/> 
    ) 
}

export default RequireAuth