import { Routes, Route } from 'react-router'

import Layout_public from './pages/Layout_public'
import Home_public from './pages/Home_public'
import AboutUs from './pages/AboutUs'
import Login from './pages/Login'
import Register from './pages/Register'
import Missing from './pages/Missing'
import RequireAuth from './features/auth/RequireAuth'
import Home from './pages/Home'


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

        {/*PRIVATE ROUTES*/}
        <Route  path='/protector' element={<RequireAuth/>}>
          <Route path='/home' element={<Home/>}/> 
          
        </Route> 
    
  
        
        <Route path='*' element={<Missing/>}/>
      </Routes>
  )
}

export default App
