import Layout from "../../components/Layout";
import "./Termometro.css";

import { useState } from "react";

import DetailTermometro from "./DetailTermometro";
import MiniTermometro from "./MiniTermometro";

function Termometro() {
  const [mostrarDetalle, setMostrarDetalle] =
    useState(false);

  const [alumnoSeleccionado, setAlumnoSeleccionado] =
    useState(null);

  const alumnos = [
    {
      id: 1,
      nombre: "María López",
      grupo: "3A",
      libros: 18,
      ultimoLibro:
        "Charlie y la fábrica de chocolate",
      fecha: "20/05/2026",
    },

    {
      id: 2,
      nombre: "Mateo Gutiérrez",
      grupo: "3A",
      libros: 10,
      ultimoLibro: "Matilda",
      fecha: "18/05/2026",
    },

    {
      id: 3,
      nombre: "Sofía Pérez",
      grupo: "3A",
      libros: 25,
      ultimoLibro: "Harry Potter",
      fecha: "25/05/2026",
    },
  ];

  const abrirDetalle = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setMostrarDetalle(true);
  };

  return (
    <Layout>
      <div className="termometro-container">

        <div className="termometro-header">

          <h1>Termómetro escolar</h1>

          <input
            type="text"
            placeholder="Buscar..."
            className="buscador"
          />

        </div>

        <div className="cards-termometro">

          {alumnos.map((alumno) => (
            <div
              key={alumno.id}
              className="card-termometro"
              onClick={() =>
                abrirDetalle(alumno)
              }
            >

              <h3>
                {alumno.nombre} {alumno.grupo}
              </h3>

              <div className="contenido-card">

                <MiniTermometro
                  libros={alumno.libros}
                />

              </div>

              <p className="libros-card">
                {alumno.libros} Libros
              </p>

            </div>
          ))}

        </div>

        {mostrarDetalle &&
          alumnoSeleccionado && (
            <DetailTermometro
              alumno={alumnoSeleccionado}
              onClose={() =>
                setMostrarDetalle(false)
              }
            />
          )}

      </div>
    </Layout>
  );
}

export default Termometro;