import { Routes, Route, useLocation } from "react-router-dom"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"

import MyNav from "./components/MyNav"
import Home from "./components/Home"
import ProfilePage from "./components/ProfilePage"

// ✅ attenzione ai percorsi REALI nel tuo progetto
import Welcome from "./components/Login/Welcome" // <-- giusto
import Registration from "./components/Login/Registration" // <-- giusto (se il file è lì)
import Login from "./components/Login/Login" // <-- giusto

function App() {
  const location = useLocation()

  const hideNav = location.pathname === "/welcome" || location.pathname === "/registration" || location.pathname === "/login"

  return (
    <>
      {!hideNav && <MyNav />}

      <Routes>
        {/* AUTH */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />

        {/* APP */}
        <Route path="/" element={<Home />} />
        <Route path="/profile/me" element={<ProfilePage />} />
      </Routes>
    </>
  )
}

export default App
