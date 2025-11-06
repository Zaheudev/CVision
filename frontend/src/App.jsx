import './App.css'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Dashboard from './Components/Dashboard/Dashboard'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'

const PublicRoute = ({ children }) => {
  const { getToken } = useAuth();
  if (getToken()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

const PrivateRoute = ({ children }) => {
  const { getToken } = useAuth();
  if (!getToken()) {
    return <Navigate to="/" replace />;
  }

  return children;
}


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
