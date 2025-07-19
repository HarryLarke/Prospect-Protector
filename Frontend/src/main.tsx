import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route} from 'react-router'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './index.css'
import App from './app/App'
import Home_public from './pages/Home_public'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<Home_public/>}/> 
        </Routes>
      </Router>
     </Provider>
  </StrictMode>
)
