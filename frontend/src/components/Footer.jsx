import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-left">
        🌿 Sanal Bahçem
      </div>

      <div className="footer-center">
        <p>Bitkilerinizi dijital ortamda yönetin</p>
        <small>© {new Date().getFullYear()} Tüm hakları saklıdır</small>
      </div>

      <div className="footer-right">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="insta"
        >
          Instagram
        </a>
      </div>

    </footer>
  );
}

export default Footer;