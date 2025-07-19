import { Routes, Route } from 'react-router'

import Layout_public from '../pages/Layout_public'
import Home_public from '../pages/Home_public'
import AboutUs from '../pages/AboutUs'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Missing from '../pages/Missing'
import RequireAuth from '../features/auth/RequireAuth'
import Dashboard from '../pages/Dashboard'

const ROLES = {
  'USER': 2001,
  'EDITOR': 5150,
  'ADMIN': 1984,
}

function App() {
  return (
  
      <Routes> 

        {/*PUBLIC ROUTES*/}
        <Route path='/' element={<Layout_public/>}>
          <Route index element={<Home_public/>}/>
          <Route path='/aboutUs' element={<AboutUs/>}/>
          <Route path='login'element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
        </Route>  

      </Routes>
  )
}

export default App
