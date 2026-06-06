import Layout from "../../components/Layout";
import "./Dashboard.css";

import { FaBook } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { MdLibraryBooks } from "react-icons/md";

function Dashboard() {
  return (
    <Layout>
      <div className="dashboard-container">

        <div className="dashboard-header">

          <h1>
            Bienvenida, Mtra. Elizabeth
          </h1>

          <p>
            Sistema de control de biblioteca escolar
          </p>

        </div>

        <div className="cards-dashboard">

          <div className="card card-libros">
            <FaBook />
            <h2>250</h2>
            <span>de 260 libros</span>
          </div>

          <div className="card card-prestamos">
            <MdLibraryBooks />
            <h2>10</h2>
            <span>Préstamos activos</span>
          </div>

          <div className="card card-alumnos">
            <PiStudentFill />
            <h2>60</h2>
            <span>Alumnos</span>
          </div>

          <div className="card card-docentes">
            <FaPeopleGroup />
            <h2>6</h2>
            <span>Docentes</span>
          </div>

        </div>

        <div className="ultimos-prestamos">

          <h2>Últimos préstamos</h2>

          <table>

            <thead>
              <tr>
                <th>Alumno</th>
                <th>Libro</th>
                <th>Fecha</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Juan Pérez</td>
                <td>El Principito</td>
                <td>08/05/2026</td>
              </tr>

              <tr>
                <td>María López</td>
                <td>Cuentos de la Selva</td>
                <td>08/05/2026</td>
              </tr>

              <tr>
                <td>Sofía Ramírez</td>
                <td>Alicia en el País de las Maravillas</td>
                <td>07/05/2026</td>
              </tr>

              <tr>
                <td>Diego Torres</td>
                <td>Atlas Infantil de México</td>
                <td>07/05/2026</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;