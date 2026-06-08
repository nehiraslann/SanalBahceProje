import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { API_URL } from "../config";

import { validateEmail, validatePassword } from "../utils/validation";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error"
  });

  const navigate = useNavigate();

  const showPopup = (message, type = "error") => {
    setPopup({
      show: true,
      message,
      type
    });

    setTimeout(() => {
      setPopup({ show: false, message: "", type: "error" });
    }, 2500);
  };

  const handleRegister = async () => {

    // boş kontrol
    if (!username || !email || !password) {
      showPopup("Tüm alanları doldurunuz", "error");
      return;
    }

    // email kontrol
    if (!validateEmail(email)) {
      showPopup("Geçerli bir email giriniz", "error");
      return;
    }

    // password strength kontrol
    if (!validatePassword(password)) {
      showPopup("Şifre en az 6 karakter, 1 harf ve 1 rakam içermeli", "error");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        username,
        email,
        password
      });

      showPopup("Hesap oluşturuldu. Giriş yapabilirsiniz", "success");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      showPopup(
        err.response?.data?.message || "Hata oluştu",
        "error"
      );
    }
  };

  return (
    <div className="page">

      {/* POPUP */}
      {popup.show && (
        <div className="popup-overlay">
          <div className={`popup-box ${popup.type}`}>

            <p>{popup.message}</p>

            <button onClick={() =>
              setPopup({ ...popup, show: false })
            }>
              ✖
            </button>

          </div>
        </div>
      )}

      <div className="login-card">

        <div className="title-box">
          <h1>Kayıt Ol</h1>
        </div>

        <input
          className="input"
          placeholder="Kullanıcı adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button" onClick={handleRegister}>
          Hesap Oluştur
        </button>

        <p
          style={{ marginTop: "10px", cursor: "pointer", color: "#6AA50F" }}
          onClick={() => navigate("/login")}
        >
          Zaten hesabım var
        </p>

      </div>

    </div>
  );
}

export default Register;