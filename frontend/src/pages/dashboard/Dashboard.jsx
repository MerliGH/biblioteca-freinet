import Layout from "../../components/Layout";
import "./Dashboard.css";

import { useState, useEffect } from "react";

import { FaBook } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { MdLibraryBooks } from "react-icons/md";

import api from "../../services/api";

function Dashboard() {

  const [libros, setLibros] = useState(0);
  const [prestamos, setPrestamos] = useState(0);
  const [alumnos, setAlumnos] = useState(0);
  const [docentes, setDocentes] = useState(0);

  const [ultimosPrestamos,
    setUltimosPrestamos] = useState([]);
    
    const usuario = JSON.parse(
      localStorage.getItem(
        "usuario"
      )
    );

    const esDirectora =
      usuario?.rol ===
      "DIRECTORA";

  useEffect(() => {
    cargarDashboard();
  }, []);

const cargarDashboard = async () => {

try {

const [
  usuariosResponse,
  librosResponse,
  prestamosResponse,
] = await Promise.all([
  api.get("/usuarios/"),
  api.get("/libros/"),
  api.get("/prestamos/"),
]);

const usuarios =
  usuariosResponse.data;

const librosData =
  librosResponse.data;

const prestamosData =
  prestamosResponse.data;

const usuarioLogueado =
  JSON.parse(
    localStorage.getItem(
      "usuario"
    )
  );

let alumnosVisibles =
  usuarios.filter(
    (u) =>
      u.rol === "ALUMNO"
  );

if (
  usuarioLogueado?.rol ===
    "DOCENTE" &&
  usuarioLogueado?.grado &&
  usuarioLogueado?.grupo
) {

  alumnosVisibles =
    alumnosVisibles.filter(
      (alumno) =>
        String(
          alumno.grado
        ) ===
          String(
            usuarioLogueado.grado
          ) &&
        String(
          alumno.grupo
        )
          .trim()
          .toUpperCase() ===
        String(
          usuarioLogueado.grupo
        )
          .trim()
          .toUpperCase()
    );

}

const idsAlumnosVisibles =
  alumnosVisibles.map(
    (a) =>
      a.id_usuario
  );

const prestamosVisibles =
  (
    usuarioLogueado?.rol ===
      "DOCENTE" &&
    usuarioLogueado?.grado &&
    usuarioLogueado?.grupo
  )
    ? prestamosData.filter(
        (prestamo) =>
          idsAlumnosVisibles.includes(
            prestamo.usuario_id
          )
      )
    : prestamosData;

setLibros(
  librosData.length
);

setPrestamos(
  prestamosVisibles.filter(
    (p) =>
      p.estado ===
        "PRESTADO" ||
      p.estado ===
        "VENCIDO"
  ).length
);

setAlumnos(
  alumnosVisibles.length
);

setDocentes(
  usuarios.filter(
    (u) =>
      u.rol === "DOCENTE"
  ).length
);

const prestamosConAlumno =
  prestamosVisibles.map(
    (prestamo) => {

      const alumno =
        usuarios.find(
          (u) =>
            u.id_usuario ===
            prestamo.usuario_id
        );

      const libro =
        librosData.find(
          (l) =>
            l.id_libro ===
            prestamo.libro_id
        );

      return {

        ...prestamo,

        alumno:
          alumno
            ? `${alumno.nombre} ${alumno.apellido_paterno}`
            : "Sin alumno",

        libro:
          libro?.titulo ||
          "Sin libro",

      };

    }
  );

setUltimosPrestamos(
  prestamosConAlumno
    .sort(
      (a, b) =>
        new Date(
          b.fecha_prestamo
        ) -
        new Date(
          a.fecha_prestamo
        )
    )
    .slice(0, 5)
);

} catch (error) {

console.error(
  "Error al cargar dashboard:",
  error
);

}

};

  return (
    <Layout>

      <div className="dashboard-container">

        <div className="dashboard-header">

      <h1>

        Bienvenido(a),

        {" "}

        {`${usuario?.nombre || ""} ${usuario?.apellido_paterno || ""}`}

      </h1>

          <p>
            Sistema de control de
            biblioteca escolar
          </p>

        </div>

        <div className="cards-dashboard">

          <div className="card card-libros">

            <FaBook />

            <h2>{libros}</h2>

            <span>
              Libros registrados
            </span>

          </div>

          <div className="card card-prestamos">

            <MdLibraryBooks />

            <h2>{prestamos}</h2>

            <span>
              Préstamos activos
            </span>

          </div>

          <div className="card card-alumnos">

            <PiStudentFill />

            <h2>{alumnos}</h2>

            <span>Alumnos</span>

          </div>
            {esDirectora && (

              <div className="card card-docentes">

                <FaPeopleGroup />

                <h2>{docentes}</h2>

                <span>Docentes</span>

              </div>

            )}

        </div>

        <div className="ultimos-prestamos">

          <h2>
            Últimos préstamos
          </h2>

          <table>

            <thead>

              <tr>
                <th>Alumno</th>
                <th>Libro</th>
                <th>Fecha</th>
              </tr>

            </thead>

            <tbody>

              {ultimosPrestamos.map(
                (prestamo) => (

                  <tr
                    key={
                      prestamo.id_prestamo
                    }
                  >

                    <td>
                      {
                        prestamo.alumno
                      }
                    </td>

                    <td>
                      {
                        prestamo.libro
                      }
                    </td>

                    <td>
                      {new Date(
                        prestamo.fecha_prestamo
                      ).toLocaleDateString()}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;