import { Outlet } from "react-router";

import Header_public from '../components/Header_public'

const footerText = '--Prospect Protector 2025--'

const Layout_public = () => {
    return(
        <div className="body">
            <Header_public/>
            <Outlet/>
            <footer>{footerText}</footer>
        </div>
    ) 
}

export default Layout_public