import "./Sidebar.css";

import { HiOutlineHome } from "react-icons/hi";
import { PiBookOpenTextLight } from "react-icons/pi";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { BsThermometerHalf } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="menu-item active">
        <HiOutlineHome className="icon" />
        <span>Inicio</span>
      </div>

      <div className="menu-item">
        <PiBookOpenTextLight className="icon" />
        <span>Libros</span>
        <IoChevronDown className="arrow" />
      </div>

      <div className="menu-item">
        <FaUserGraduate className="icon" />
        <span>Alumnos</span>
      </div>

      <div className="menu-item">
        <FaChalkboardTeacher className="icon" />
        <span>Docentes</span>
      </div>

      <div className="menu-item">
        <BsThermometerHalf className="icon" />
        <span>Termómetro</span>
      </div>
    </aside>
  );
}

export default Sidebar;