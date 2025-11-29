import './App.css'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Dashboard from './Components/Dashboard/Dashboard'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import ProfilCandidat from './Components/ProfilulMeu/ProfilCandidat/ProfilCandidat'
import LandingPage from './Components/LandingPage/LandingPage'
import SubscriptionPage from './Components/SubscriptionPage/SubscriptionPage'
import SettingsCandidat from './Components/Settings/SettingsCandidat/SettingsCandidat'
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
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profil-candidat" element={<PrivateRoute><ProfilCandidat /></PrivateRoute>} />
          <Route path="/settingscandidat" element={<PrivateRoute><SettingsCandidat /></PrivateRoute>} />
          <Route path="/subscription" element={<SubscriptionPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
