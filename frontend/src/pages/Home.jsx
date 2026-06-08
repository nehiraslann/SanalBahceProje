import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="home-wrapper">

      {/* HERO */}
      <section className="hero">

        <h1>🌿 Sanal Bahçem</h1>

        <p>
          Bitkilerinizi dijital ortamda yönetin, sulama zamanlarını kaçırmayın ve
          bahçenizi akıllı şekilde kontrol edin.
        </p>

        <button
          onClick={() => navigate(token ? "/dashboard" : "/login")}
          className="primary-btn"
        >
          {token ? "Bahçeme Git" : "Giriş Yap"}
        </button>

      </section>

      {/* STATS */}
      <section className="stats">

        <h2> İstatistikler</h2>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>50+</h3>
            <p>Bitki Takibi</p>
          </div>

          <div className="stat-card">
            <h3>100+</h3>
            <p>Günlük Not</p>
          </div>

          <div className="stat-card">
            <h3>7/24</h3>
            <p>Erişim</p>
          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="features">

        <h2>🌱 Özellikler</h2>

        <div className="features-grid">

          <div className="feature-card">✔ Bitki Yönetimi</div>
          <div className="feature-card">✔ Sulama Takibi</div>
          <div className="feature-card">✔ Bahçe Günlüğü</div>
          <div className="feature-card">✔ Güvenli Hesap Sistemi</div>

        </div>

      </section>

      {/* CTA */}
      <section className="cta">

        <h2> Başlamaya Hazır mısın?</h2>

        <p>Bahçeni hemen oluşturmaya başla ve bitkilerini kontrol altına al.</p>

        <button
          onClick={() => navigate(token ? "/dashboard" : "/register")}
          className="secondary-btn"
        >
          Hemen Başla
        </button>

      </section>

    </div>
  );
}

export default Home;