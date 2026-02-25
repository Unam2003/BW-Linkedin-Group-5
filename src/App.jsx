import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import MyNav from "./components/MyNav";
import Home from "./components/Home";
import ProfilePage from "./components/ProfilePage";
import Jobs from "./components/Jobs";

import Welcome from "./components/Login/Welcome";
import Registration from "./components/Login/Registration";
import Login from "./components/Login/Login";

// ✅ chiave chiara
const CHIAVE_UTENTE_LOGGATO = "utenteLoggato";

function RequireAuth({ children }) {
  const utenteLoggato = localStorage.getItem(CHIAVE_UTENTE_LOGGATO) === "true";
  return utenteLoggato ? children : <Navigate to="/welcome" replace />;
}

function App() {
  const location = useLocation();
  const hideNav = location.pathname === "/welcome" || location.pathname === "/registration" || location.pathname === "/login";

  return (
    <>
      {!hideNav && <MyNav />}

      <Routes>
        {/* AUTH */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />

        {/* APP */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/me"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </>
  );
}

export default App;
