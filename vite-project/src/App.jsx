import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import Adminpage from '../pages/adminpage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <BrowserRouter>
            <Routes path="/">
                
                <Route path="/" element={<h1>rotes</h1>}> </Route>
                <Route path="login" element={<h2>route 2</h2>}></Route>
                <Route path="students" element={<Productcard name="wddc"/>}></Route>
                <Route path="admin/*" element={<Adminpage/>}></Route>
                <Route path="/*" element={<Adminpage/>}></Route> 
          </Routes>
      
    
    
    </BrowserRouter>
    
      
    </>
  )
}


export default App
