import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validation";
import "./Login.css";
import { API_URL } from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

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

  const handleLogin = async () => {

    if (!email || !password) {
      showPopup("Email ve şifre giriniz", "error");
      return;
    }

  
    if (!validateEmail(email)) {
      showPopup("Geçerli bir email giriniz", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
  `${API_URL}/api/auth/login`,
  { email, password }
);

      localStorage.setItem("token", res.data.token);

      setLoading(false);

      window.location.href = "/";

    } catch (err) {
      setLoading(false);

      showPopup(
        err.response?.data?.message || "Hatalı giriş",
        "error"
      );
    }
  };

  return (
    <div className="page">

      
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
          <h1>Sanal Bahçem</h1>
        </div>

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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>

     
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <span>Hesabın yok mu? </span>

          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#6AA50F",
              fontWeight: "700",
              cursor: "pointer"
            }}
          >
            Kayıt ol
          </span>
        </div>

      </div>

    </div>
  );
}

export default Login;