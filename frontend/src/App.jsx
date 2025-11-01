import { useState } from 'react'
import './App.css'
import LoginSignup from './Components/Login/Login'
import Register from './Components/Register/Register'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
