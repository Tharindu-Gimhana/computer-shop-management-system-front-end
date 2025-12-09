import { useState } from 'react'
import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Adminpage from './pages/adminpage'
import { Toaster } from 'react-hot-toast'
import Loginpage from './pages/loginpage'
import HomePage from './pages/Homepage'
import RegisterPage from './pages/registerpage'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <GoogleOAuthProvider clientId="765785052534-qnqfei3kiih3a4ll38h9m6c0mtjolrt0.apps.googleusercontent.com">
       <BrowserRouter>
         <Toaster />
            <Routes path="/">

                <Route path="/*" element={<HomePage />}> </Route>
                <Route path="login" element={<Loginpage />}></Route>
                <Route path="admin/*" element={<Adminpage/>}></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>
          </Routes>
      
    
    
    </BrowserRouter>
    </GoogleOAuthProvider>
    
      
    </>
  )
}


export default App
