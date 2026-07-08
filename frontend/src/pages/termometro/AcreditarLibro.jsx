import "./AcreditarLibro.css";
import RegistrarLectura from "./RegistrarLectura";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import api from "../../services/api";

function AcreditarLibro({
  alumno,
  onClose,
  actualizar,
}) {

  const [prestamos,
    setPrestamos] =
    useState([]);

  const [cargando,
    setCargando] =
    useState(true);
const [mostrarCrear,
  setMostrarCrear] =
  useState(false);

const [prestamoSeleccionado,
  setPrestamoSeleccionado] =
  useState(null);
  useEffect(() => {

    obtenerPrestamos();

  }, []);

  const obtenerPrestamos =
    async () => {

      try {

        const [
          prestamosRes,
          librosRes,
          termometroRes,
        ] = await Promise.all([
          api.get("/prestamos/"),
          api.get("/libros/"),
          api.get("/termometro/"),
        ]);

        const prestamosAlumno =
          prestamosRes.data

            .filter(
              (prestamo) =>
                prestamo.usuario_id ===
                alumno.id_usuario
            )

            .filter(
              (prestamo) =>
                !termometroRes.data.some(
                  (registro) =>
                    registro.usuario_id ===
                      alumno.id_usuario &&
                    registro.libro_id ===
                      prestamo.libro_id
                )
            )

            .map(
              (prestamo) => {

                const libro =
                  librosRes.data.find(
                    (lib) =>
                      lib.id_libro ===
                      prestamo.libro_id
                  );

                return {

                  ...prestamo,

                  tituloLibro:
                    libro?.titulo ||
                    "Libro no encontrado",

                };

              }
            );

        setPrestamos(
          prestamosAlumno
        );

      } catch (error) {

        console.error(
          "Error al obtener préstamos:",
          error
        );

      } finally {

        setCargando(false);

      }

    };

  const acreditarLibro =
    async (prestamo) => {

      try {

        const usuario =
          JSON.parse(
            localStorage.getItem(
              "usuario"
            )
          );

        await api.post(
          "/termometro/",
          {

            usuario_id:
              alumno.id_usuario,

            libro_id:
              prestamo.libro_id,

            registrado_por:
              usuario.id_usuario,

            fecha_acreditacion:
              new Date()
                .toISOString()
                .split("T")[0],

            observaciones:
              "Lectura acreditada",

            estado: true,

          }
        );

       await Swal.fire({
  icon: "success",
  title: "Libro acreditado",
  text: `El libro "${prestamo.tituloLibro}" fue acreditado correctamente.`,
  confirmButtonColor: "#1f4788",
});

await actualizar();

obtenerPrestamos();

onClose();

      } catch (error) {

        console.error(error);

        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "No fue posible acreditar el libro.",
          confirmButtonColor:
            "#1f4788",
        });

      }

    };

  return (

    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="acreditar-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <h2>
          Acreditar libro
        </h2>

        <p>

          Alumno:
          {" "}

          <strong>
            {
              alumno.nombreAlumno
            }
          </strong>

        </p>

        {cargando ? (

          <p>
            Cargando...
          </p>

        ) : (

          <table className="tabla-acreditar">

            <thead>

              <tr>

                <th>Libro</th>

                <th>Estado</th>

                <th>Acción</th>

              </tr>

            </thead>

            <tbody>

              {prestamos.length > 0 ? (

                prestamos.map(
                  (
                    prestamo
                  ) => (

                    <tr
                      key={
                        prestamo.id_prestamo
                      }
                    >

                      <td>
                        {
                          prestamo.tituloLibro
                        }
                      </td>

                      <td>
                        {
                          prestamo.estado
                        }
                      </td>

                      <td>

                       <button
  className="btn-acreditar"
  onClick={() => {
     console.log("Alumno:", alumno);

  console.log("Libro:", prestamo);

    setPrestamoSeleccionado(
      prestamo
    );

    setMostrarCrear(
      true
    );

  }}
>
  Acreditar
</button>
                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="3"
                    style={{
                      textAlign:
                        "center",
                    }}
                  >

                    Todos los libros ya fueron acreditados

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        )}

        <button
          className="btn-cancelar"
          onClick={onClose}
        >
          Cerrar
        </button>
        
{mostrarCrear && prestamoSeleccionado && (

 <RegistrarLectura
  onClose={() => {
    setMostrarCrear(false);
    onClose();
  }}
  alumno={alumno}
  prestamo={prestamoSeleccionado}
  actualizar={actualizar}
/>

)}
      </div>

    </div>

  );

}

export default AcreditarLibro;