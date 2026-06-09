import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Token senkron takip
  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem("token"));
    };

    // ilk yükleme
    syncToken();

    // login/logout için küçük polling 
    const interval = setInterval(syncToken, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>

      {token && <Navbar />}

      <div style={{ marginTop: token ? "60px" : "0px" }}>

        <Routes>

          <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />}  />
          <Route path="/notes" element={token ? <Notes /> : <Navigate to="/login" />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />}/>

        </Routes>

      </div>

      {token && <Footer />}

    </BrowserRouter>
  );
}

export default App;