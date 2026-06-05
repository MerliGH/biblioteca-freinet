import "./Header.css";
import logoICF from "../assets/LOGO_RECORTADO.png";

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logoICF} alt="Instituto Celestin Freinet" />
      </div>

      <div className="header-user">
        <span>MTRA. ELIZABETH</span>
        <button className="logout-btn">
          ⮕
        </button>
      </div>
    </header>
  );
}

export default Header;