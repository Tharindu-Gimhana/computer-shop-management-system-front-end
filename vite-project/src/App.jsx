import { useState } from 'react'
import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Adminpage from './pages/adminpage'
import { Toaster } from 'react-hot-toast'
import Loginpage from './pages/loginpage'
import HomePage from './pages/Homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <BrowserRouter>
         <Toaster />
            <Routes path="/">
                
                <Route path="/" element={<HomePage />}> </Route>
                <Route path="login" element={<Loginpage />}></Route>
                <Route path="admin/*" element={<Adminpage/>}></Route>
                <Route path="/*" element={<Adminpage/>}></Route> 
          </Routes>
      
    
    
    </BrowserRouter>
    
      
    </>
  )
}


export default App
