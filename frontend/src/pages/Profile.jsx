import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

import { validatePassword } from "../utils/validation";

const API_URL = "https://sanalbahceproje.onrender.com";

function Profile() {
  const [user, setUser] = useState(null);

  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loadingUsername, setLoadingUsername] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const showPopup = (message, type = "success") => {
    setPopup({ show: true, message, type });

    setTimeout(() => {
      setPopup({ show: false, message: "", type: "success" });
    }, 2500);
  };

  // get user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/auth/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(res.data);
        setNewUsername(res.data.username);
      } catch (err) {
        navigate("/login");
      }
    };

    if (token) fetchUser();
    else navigate("/login");
  }, [token, navigate]);


  const updateUsername = async () => {
    if (newUsername.length < 3) {
      showPopup("Kullanıcı adı en az 3 karakter olmalı", "error");
      return;
    }

    try {
      setLoadingUsername(true);

      const res = await axios.put(
        `${API_URL}/api/auth/update-username`,
        { username: newUsername },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(res.data);
      showPopup("Kullanıcı adı güncellendi", "success");
    } catch {
      showPopup("Hata oluştu", "error");
    } finally {
      setLoadingUsername(false);
    }
  };


  const updatePassword = async () => {
    if (!currentPassword || !newPassword) {
      showPopup("Tüm alanları doldurun", "error");
      return;
    }

    if (!validatePassword(newPassword)) {
      showPopup("Şifre güçlü değil", "error");
      return;
    }

    try {
      setLoadingPassword(true);

      await axios.put(
        `${API_URL}/api/auth/change-password`,
        { currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCurrentPassword("");
      setNewPassword("");

      showPopup("Şifre güncellendi", "success");
    } catch {
      showPopup("Şifre hatalı", "error");
    } finally {
      setLoadingPassword(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setLoadingDelete(true);

      await axios.delete(
        `${API_URL}/api/auth/delete-account`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.clear();
      showPopup("Hesap silindi", "success");

      setTimeout(() => {
        window.location.href = "/register";
      }, 1200);

    } catch {
      showPopup("Hesap silinemedi", "error");
    } finally {
      setLoadingDelete(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (!user) return <div className="profile-page">Yükleniyor...</div>;

  return (
    <div className="profile-page">

      {popup.show && (
        <div className="popup-overlay">
          <div className={`popup-box ${popup.type}`}>
            <p>{popup.message}</p>
            <button onClick={() => setPopup({ ...popup, show: false })}>
              ✖
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Hesabınızı silmek istediğinize emin misiniz?</h3>
            <p>Bu işlem geri alınamaz.</p>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                Hayır
              </button>

              <button
                className="confirm-btn"
                onClick={() => {
                  setShowDeleteModal(false);
                  deleteAccount();
                }}
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="profile-card">
        <div className="avatar">👤</div>
        <h2>{user.username}</h2>
        <p>{user.email}</p>
      </div>

      <div className="profile-card">
        <h3>Kullanıcı Adı</h3>

        <input
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />

        <button onClick={updateUsername} disabled={loadingUsername}>
          Güncelle
        </button>
      </div>

      <div className="profile-card">
        <h3>Şifre Değiştir</h3>

        <input
          type="password"
          placeholder="Mevcut şifre"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Yeni şifre"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button onClick={updatePassword} disabled={loadingPassword}>
          Kaydet
        </button>
      </div>

      <button onClick={logout} className="logout-btn">
        Çıkış Yap
      </button>

      <button
        className="delete-btn"
        onClick={() => setShowDeleteModal(true)}
      >
        Hesabı Sil
      </button>

    </div>
  );
}

export default Profile;