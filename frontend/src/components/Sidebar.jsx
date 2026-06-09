import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import { HiOutlineHome } from "react-icons/hi";
import { PiBookOpenTextLight } from "react-icons/pi";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";

import { BsThermometerHalf } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";

function Sidebar() {

  const [openLibros, setOpenLibros] =
    useState(false);

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
      <div className="menu-item libros-menu">

        <NavLink
          to="/libros"
          className="libros-link"
        >
          <PiBookOpenTextLight
            className="icon"
          />

          <span>Libros</span>

        </NavLink>

        <IoChevronDown
          className={`arrow ${
            openLibros
              ? "rotate"
              : ""
          }`}
          onClick={() =>
            setOpenLibros(
              !openLibros
            )
          }
        />

      </div>

      {openLibros && (

        <div className="submenu">

          <NavLink
            to="/prestamos"
            className="submenu-item"
          >
            Préstamos
          </NavLink>

          <NavLink
            to="/historial"
            className="submenu-item"
          >
            Historial
          </NavLink>

        </div>

      )}

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

      {/* SOLO DIRECTORA */}
      {esDirectora && (

        <NavLink
          to="/docentes"
          className={({ isActive }) =>
            isActive
              ? "menu-item active"
              : "menu-item"
          }
        >
          <FaChalkboardTeacher
            className="icon"
          />
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