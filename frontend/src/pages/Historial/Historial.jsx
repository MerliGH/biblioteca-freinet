import Layout from "../../components/Layout";
import "./Historial.css";

import { useState, useEffect } from "react";

import api from "../../services/api";

function Historial() {

  const [historial, setHistorial] =
    useState([]);

  const [busqueda, setBusqueda] =
    useState("");

  const [filtroGrado,
    setFiltroGrado] =
    useState("");

  const [filtroGrupo,
    setFiltroGrupo] =
    useState("");

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const mostrarFiltros =
    usuario?.rol === "DIRECTORA"
    ||
    (
      usuario?.rol === "DOCENTE"
      &&
      (
        !usuario?.grado
        ||
        !usuario?.grupo
      )
    );

  const grados = [
    ...new Set(
      historial
        .map(
          (h) => h.gradoAlumno
        )
        .filter(Boolean)
    )
  ].sort();

  const grupos = [
    ...new Set(
      historial
        .map(
          (h) => h.grupoAlumno
        )
        .filter(Boolean)
    )
  ].sort();

  useEffect(() => {
    obtenerHistorial();
  }, []);

  const formatearFecha = (fecha) => {
    if (!fecha) return "-";
    const [year, month, day] =
      fecha
        .split("T")[0]
        .split("-");
    return `${day}/${month}/${year}`;
  };

  const obtenerHistorial = async () => {
    try {
      const [
        prestamosResponse,
        usuariosResponse,
        librosResponse,
      ] = await Promise.all([
        api.get("/prestamos/"),
        api.get("/usuarios/"),
        api.get("/libros/"),
      ]);
      let historialPrestamos =
        prestamosResponse.data
          .filter(
            (prestamo) =>
              prestamo.estado ===
              "DEVUELTO"
          )
          .map((prestamo) => {
            const alumno =
              usuariosResponse.data.find(
                (usuarioItem) =>
                  usuarioItem.id_usuario ===
                  prestamo.usuario_id
              );

            const docente =
              usuariosResponse.data.find(
                (usuarioItem) =>
                  usuarioItem.id_usuario ===
                  prestamo.autorizado_por
              );

            const libro =
              librosResponse.data.find(
                (lib) =>
                  lib.id_libro ===
                  prestamo.libro_id
              );

            return {
              ...prestamo,
              nombreAlumno:
                alumno
                  ? `${alumno.nombre} ${alumno.apellido_paterno}`
                  : "No encontrado",
              autorizadoPor:
                docente
                  ? `${docente.nombre} ${docente.apellido_paterno}`
                  : "No encontrado",
              tituloLibro:
                libro
                  ? libro.titulo
                  : "No encontrado",
              gradoAlumno:
                alumno?.grado || "",
              grupoAlumno:
                alumno?.grupo || "",
            };

          });
      if (
        usuario?.rol ===
          "DOCENTE"
        &&
        usuario?.grado
        &&
        usuario?.grupo
      ) {
        historialPrestamos =
          historialPrestamos.filter(
            (registro) =>
              String(
                registro.gradoAlumno
              ) ===
              String(
                usuario.grado
              )
              &&
              String(
                registro.grupoAlumno
              )
                .trim()
                .toUpperCase()
              ===
              String(
                usuario.grupo
              )
                .trim()
                .toUpperCase()
          );
      }
      historialPrestamos.sort(
        (a, b) =>
          b.id_prestamo -
          a.id_prestamo
      );
      setHistorial(
        historialPrestamos
      );
    } catch (error) {
      console.error(
        "Error al obtener historial:",
        error
      );
    }
  };

  const historialFiltrado =
    historial.filter(
      (registro) => {
        const texto =
          busqueda.toLowerCase();
        const coincideBusqueda =
          (registro.nombreAlumno || "")
            .toLowerCase()
            .includes(texto)
          ||
          (registro.tituloLibro || "")
            .toLowerCase()
            .includes(texto)
          ||
          (registro.estado || "")
            .toLowerCase()
            .includes(texto)
          ||
          (registro.autorizadoPor || "")
            .toLowerCase()
            .includes(texto)
          ||
          formatearFecha(
            registro.fecha_prestamo
          )
            .toLowerCase()
            .includes(texto)
          ||
          formatearFecha(
            registro.fecha_devolucion
          )
            .toLowerCase()
            .includes(texto);
            
        const coincideGrado =
          filtroGrado === ""
          ||
          String(
            registro.gradoAlumno
          ) === filtroGrado;

        const coincideGrupo =
          filtroGrupo === ""
          ||
          String(
            registro.grupoAlumno
          ) === filtroGrupo

        return (
          coincideBusqueda
          &&
          coincideGrado
          &&
          coincideGrupo
        );

      }

    );

  return (

    <Layout>

      <div className="historial-container">

        <div className="historial-header">

          <h1>
            Historial de Préstamos
          </h1>

          <div className="acciones">

            <div className="barra-filtros">

              <input

                type="text"

                placeholder="Buscar..."

                className="buscador"

                value={busqueda}

                onChange={(e) =>

                  setBusqueda(

                    e.target.value

                  )

                }

              />

              {mostrarFiltros && (

                <>

                  <select

                    className="filtro-select"

                    value={filtroGrado}

                    onChange={(e) =>

                      setFiltroGrado(

                        e.target.value

                      )

                    }

                  >

                    <option value="">

                      Todos los grados

                    </option>

                    {grados.map(

                      (grado) => (

                        <option

                          key={grado}

                          value={grado}

                        >

                          {grado}°

                        </option>

                      )

                    )}

                  </select>

                  <select

                    className="filtro-select"

                    value={filtroGrupo}

                    onChange={(e) =>

                      setFiltroGrupo(

                        e.target.value

                      )

                    }

                  >

                    <option value="">

                      Todos los grupos

                    </option>

                    {grupos.map(

                      (grupo) => (

                        <option

                          key={grupo}

                          value={grupo}

                        >

                          {grupo}

                        </option>

                      )

                    )}

                  </select>

                </>

              )}

            </div>

          </div>

        </div>

        <table className="tabla-historial">

          <thead>

            <tr>
              <th>Alumno</th>
              <th>Grupo</th>
              <th>Libro</th>
              <th>Fecha préstamo</th>
              <th>Fecha devolución</th>
              <th>Estado</th>
              <th>Autorizado por</th>
            </tr>

          </thead>

          <tbody>
            {historialFiltrado.map(
              (registro) => (
                <tr
                  key={
                    registro.id_prestamo
                  }
                >

                  <td>
                    {registro.nombreAlumno}
                  </td>

                  <td>
                    {registro.gradoAlumno &&
                    registro.grupoAlumno
                      ? `${registro.gradoAlumno}° ${registro.grupoAlumno}`
                      : "Sin grupo"}
                  </td>

                  <td>
                    {registro.tituloLibro}
                  </td>

                  <td>
                    <span className="fecha-pill">
                      {formatearFecha(
                        registro.fecha_prestamo
                      )}
                    </span>
                  </td>

                  <td>
                    <span className="fecha-pill">
                      {formatearFecha(
                        registro.fecha_devolucion
                      )}
                    </span>
                  </td>

                  <td>
                    {registro.estado}
                  </td>

                  <td>
                    {registro.autorizadoPor}
                  </td>

                </tr>

              )

            )}

          </tbody>

        </table>

      </div>

    </Layout>

  );

}

export default Historial;