import "./Sidebar.css";
import { NavLink } from "react-router-dom";

import { HiOutlineHome } from "react-icons/hi";
import { PiBookOpenTextLight } from "react-icons/pi";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { BsThermometerHalf } from "react-icons/bs";
import { TbBooks } from "react-icons/tb";
import { RiHistoryLine } from "react-icons/ri";

function Sidebar() {
  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const esDirectora =
    usuario?.rol === "DIRECTORA";

  return (
    <aside className="sidebar">

      {/* Inicio */}
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? "menu-item active"
            : "menu-item"
        }
      >
        <HiOutlineHome className="icon" />
        <span>Inicio</span>
      </NavLink>

      {/* Libros */}
      <NavLink
        to="/libros"
        className={({ isActive }) =>
          isActive
            ? "menu-item active"
            : "menu-item"
        }
      >
        <PiBookOpenTextLight className="icon" />
        <span>Libros</span>
      </NavLink>

      {/* Préstamos */}
      <NavLink
        to="/prestamos"
        className={({ isActive }) =>
          isActive
            ? "menu-item active"
            : "menu-item"
        }
      >
        <TbBooks className="icon" />
        <span>Préstamos</span>
      </NavLink>

      {/* Historial */}
      <NavLink
        to="/historial"
        className={({ isActive }) =>
          isActive
            ? "menu-item active"
            : "menu-item"
        }
      >
        <RiHistoryLine className="icon" />
        <span>Historial</span>
      </NavLink>

      {/* Alumnos */}
      <NavLink
        to="/alumnos"
        className={({ isActive }) =>
          isActive
            ? "menu-item active"
            : "menu-item"
        }
      >
        <FaUserGraduate className="icon" />
        <span>Alumnos</span>
      </NavLink>

      {/* Docentes (solo Directora) */}
      {esDirectora && (
        <NavLink
          to="/docentes"
          className={({ isActive }) =>
            isActive
              ? "menu-item active"
              : "menu-item"
          }
        >
          <FaChalkboardTeacher className="icon" />
          <span>Docentes</span>
        </NavLink>
      )}

      {/* Termómetro */}
      <NavLink
        to="/termometro"
        className={({ isActive }) =>
          isActive
            ? "menu-item active"
            : "menu-item"
        }
      >
        <BsThermometerHalf className="icon" />
        <span>Termómetro</span>
      </NavLink>

    </aside>
  );
}

export default Sidebar;