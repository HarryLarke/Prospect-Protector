import { Outlet } from "react-router";

import Header from "../components/Header";

const footerText = '--Prospect Protector 2025--'

const Layout = () => {

    return(
        <div>
            <Header/>
            <Outlet/>
            <footer>{footerText}</footer>
        </div>

    )
}

export default Layout