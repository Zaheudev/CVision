import './App.css'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Dashboard from './Components/Dashboard/Dashboard'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import ProfilCandidat from './Components/ProfilulMeu/ProfilCandidat/ProfilCandidat'
import ProfilAngajator from './Components/ProfilulMeu/ProfilAngajator/ProfilAngajator'
import LandingPage from './Components/LandingPage/LandingPage'
import SettingsCandidat from './Components/Settings/SettingsCandidat/SettingsCandidat'
import SettingsAngajator from './Components/Settings/SettingsAngajator/SettingsAngajator'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import useAuth from './hooks/useAuth'
import { UserContext } from './context/UserContext'

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

const ProfilRoute = () => {
  const { type } = useContext(UserContext);
  if (type === 'employer') {
    return <ProfilAngajator />;
  }
  return <ProfilCandidat />;
}

const SettingsRoute = () => {
  const { type } = useContext(UserContext);
  if (type === 'employer') {
    return <SettingsAngajator />;
  }
  return <SettingsCandidat />;
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
          <Route path="/profil" element={<PrivateRoute><ProfilRoute /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><SettingsRoute /></PrivateRoute>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
