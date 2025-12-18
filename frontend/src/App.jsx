import './App.css'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Dashboard from './Components/Dashboard/Dashboard'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Profil from './Components/ProfilulMeu/Profil'
import LandingPage from './Components/LandingPage/LandingPage'
import SubscriptionPage from './Components/SubscriptionPage/SubscriptionPage'
import Settings from './Components/Settings/Settings'
import CVulMeu from './Components/CVulMeu/CVulMeu'
import Echipa from './Components/Echipa/Echipa'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import useAuth from './hooks/useAuth'
import { UserContext } from './context/UserContext'
import MyJobs from './Components/MyJobs/MyJobs'

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
    return <Navigate to="/login" replace />;
  }

  return children;
}




function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profil" element={<PrivateRoute><Profil /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/cv" element={<PrivateRoute><CVulMeu /></PrivateRoute>} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/my-jobs" element={<PrivateRoute><MyJobs /></PrivateRoute>} />
          <Route path="/echipa" element={<Echipa />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
