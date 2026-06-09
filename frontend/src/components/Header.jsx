import "./Header.css";
import logoICF from "../assets/LOGO_RECORTADO.png";

import { FiLogOut } from "react-icons/fi";

function Header() {

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const nombreCompleto = `
    ${usuario?.nombre || ""}
    ${usuario?.apellido_paterno || ""}
  `.trim();

  const cerrarSesion = () => {

    const confirmar =
      window.confirm(
        "¿Deseas cerrar sesión?"
      );

    if (!confirmar) return;

    localStorage.clear();

    window.location.href =
      "/";

  };

  return (

    <header className="header">

      <div className="header-logo">

        <img
          src={logoICF}
          alt="Instituto Celestin Freinet"
        />

      </div>

      <div className="header-user">

        <span className="nombre-usuario">

          {nombreCompleto
            ? nombreCompleto.toUpperCase()
            : "USUARIO"}

        </span>

        <button
          className="logout-btn"
          onClick={cerrarSesion}
          title="Cerrar sesión"
        >

          <FiLogOut />

        </button>

      </div>

    </header>

  );
}

export default Header;