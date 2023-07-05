import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import "./App.css";
import RegistrationPage from "../Auth-Components/RegistrationPage/RegistrationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginPage from "../Auth-Components/LoginPage/LoginPage";

function App() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home isActive={isActive} setIsActive={setIsActive} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/register"
            element={
              <RegistrationPage
              setIsActive={setIsActive}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
