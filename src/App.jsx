import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import MyNav from "./components/MyNav";
import Home from "./components/Home";
import ProfilePage from "./components/ProfilePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import RightBar from "./components/RightBar/RightBar";

function App() {
  return (
    <BrowserRouter>
      <MyNav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/me" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
