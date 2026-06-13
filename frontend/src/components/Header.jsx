import "./Header.css";
import logoICF from "../assets/LOGO_RECORTADO.png";

import { FiLogOut } from "react-icons/fi";

import Swal from "sweetalert2";

function Header() {

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const nombreCompleto = `
    ${usuario?.nombre || ""}
    ${usuario?.apellido_paterno || ""}
  `.trim();

  const cerrarSesion =
    async () => {

      const resultado =
        await Swal.fire({

          title:
            "¿Cerrar sesión?",

          text:
            "Tu sesión actual se cerrará.",

          icon:
            "question",

          showCancelButton:
            true,

          confirmButtonText:
            "Sí, cerrar sesión",

          cancelButtonText:
            "Cancelar",

          confirmButtonColor:
            "#173b70",

          cancelButtonColor:
            "#8dc63f",

        });

      if (
        resultado.isConfirmed
      ) {

        localStorage.clear();

        window.location.href =
          "/";

      }

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