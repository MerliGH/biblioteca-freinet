import Layout from "../../components/Layout";
import "./Libros.css";

import { useState, useEffect } from "react";

import CreateLibro from "./CreateLibro";
import EditLibro from "./EditLibro";
import DeleteLibro from "./DeleteLibro";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

import api from "../../services/api";

import CreateCategoria from "./CreateCategoria";
import AdministrarCategorias from "./AdministrarCategorias";

function Libros() {

  const [libros, setLibros] =
    useState([]);

  const [categorias,
    setCategorias] =
    useState([]);

  const [busqueda,
    setBusqueda] =
    useState("");

  const [clasificacionSeleccionada,
    setClasificacionSeleccionada] =
    useState("TODOS");

  const [mostrarModal,
    setMostrarModal] =
    useState(false);
    
  const [mostrarCategoria,
  setMostrarCategoria] =
  useState(false);

  const [mostrarAdministrar,
  setMostrarAdministrar] =
  useState(false);

  const [mostrarEdit,
    setMostrarEdit] =
    useState(false);

  const [mostrarDelete,
    setMostrarDelete] =
    useState(false);

  const [libroSeleccionado,
    setLibroSeleccionado] =
    useState(null);

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const esDirectora =
    usuario?.rol === "DIRECTORA";

  useEffect(() => {

    obtenerLibros();

  }, []);

  const obtenerLibros = async () => {

    try {

      const [

        librosResponse,

        categoriasResponse

      ] = await Promise.all([

        api.get("/libros/"),

        api.get("/categorias/")

      ]);

      setLibros(

        librosResponse.data

      );

      setCategorias(

        categoriasResponse.data

      );

    } catch (error) {

      console.error(

        "Error al obtener libros:",

        error

      );

    }

  };

  const librosFiltrados =

    libros.filter(

      (libro) => {

        const coincideClasificacion =

          clasificacionSeleccionada ===

          "TODOS"

          ||

          String(

            libro.categoria_id

          ) ===

          clasificacionSeleccionada;

        const categoria =

          categorias.find(

            (cat) =>

              cat.id_categoria ===

              libro.categoria_id

          );

        const nombreCategoria =

          categoria?.nombre || "";

        const textoBusqueda =

          busqueda.toLowerCase();

        const coincideBusqueda =

          nombreCategoria

            .toLowerCase()

            .includes(

              textoBusqueda

            )

          ||

          (libro.titulo || "")

            .toLowerCase()

            .includes(

              textoBusqueda

            )

          ||

          (

            libro.autor_ilustrador || ""

          )

            .toLowerCase()

            .includes(

              textoBusqueda

            )

          ||

          (libro.serie || "")

            .toLowerCase()

            .includes(

              textoBusqueda

            )

          ||

          (

            libro.procedencia || ""

          )

            .toLowerCase()

            .includes(

              textoBusqueda

            )

          ||

          String(

            libro.cantidad_total

          ).includes(

            textoBusqueda

          )

          ||

          (libro.seccion || "")

            .toLowerCase()

            .includes(

              textoBusqueda

            );

        return (

          coincideClasificacion

          &&

          coincideBusqueda

        );

      }

    );

  return (

    <Layout>

      <div className="libros-container">

        <div className="libros-header">

          <div>

            <h1>

              Gestión de Libros

            </h1>
            <select
              className="filtro-clasificacion"
              value={clasificacionSeleccionada}
              onChange={(e) => {

              if (

                e.target.value ===

                "NUEVA_CATEGORIA"

              ) {

                setMostrarCategoria(
                  true
                );

                return;

              }

              if (

                e.target.value ===

                "ADMIN_CATEGORIAS"

              ) {

                setMostrarAdministrar(
                  true
                );

                return;

              }

              setClasificacionSeleccionada(
                e.target.value
              );

            }}
          >

              <option value="TODOS">

                Todas las clasificaciones

              </option>

              {categorias.map(

                (categoria) => (

                  <option
                    key={categoria.id_categoria}
                    value={categoria.id_categoria}
                  >

                    {categoria.nombre}

                  </option>

                )

              )}

              {esDirectora && (

                <option value="NUEVA_CATEGORIA">

                  + Nueva clasificación

                </option>

              )}

              {esDirectora && (

                <option
                  value="ADMIN_CATEGORIAS"
                >

                  Administrar clasificaciones

                </option>

              )}
            </select>

          </div>

          <div className="acciones">

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

            {esDirectora && (

              <button

                className="btn-agregar"

                onClick={() =>

                  setMostrarModal(

                    true

                  )

                }

              >

                Añadir Libro

              </button>

            )}

          </div>

        </div>

        <table className="tabla-libros">

          <thead>

            <tr>

              <th>Número</th>

              <th>Clasificación</th>

              <th>Título</th>

              <th>Autor e ilustrador</th>

              <th>Serie</th>

              <th>Procedencia</th>

              <th>Disponibles</th>

              <th>Sección</th>

              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {librosFiltrados.map(

              (libro) => (

                <tr

                  key={

                    libro.id_libro

                  }

                >

                  <td>

                    {libro.id_libro}

                  </td>

                  <td>

                    {categorias.find(

                      (categoria) =>

                        categoria.id_categoria ===

                        libro.categoria_id

                    )?.nombre ||

                    "Sin categoría"}

                  </td>

                  <td>

                    {libro.titulo}

                  </td>

                  <td>

                    {libro.autor_ilustrador}

                  </td>

                  <td>

                    {libro.serie}

                  </td>

                  <td>

                    {libro.procedencia}

                  </td>

                  <td>

                    {libro.cantidad_disponible} de {libro.cantidad_total}

                  </td>

                  <td>

                    {libro.seccion}

                  </td>

                  <td>

                    <div className="acciones-tabla">

                      <button

                        className="btn-editar"

                        onClick={() => {

                          setLibroSeleccionado(

                            libro

                          );

                          setMostrarEdit(

                            true

                          );

                        }}

                      >

                        <FaRegEdit />

                      </button>

                      {esDirectora && (

                        <button

                          className="btn-eliminar"

                          onClick={() => {

                            setLibroSeleccionado(

                              libro

                            );

                            setMostrarDelete(

                              true

                            );

                          }}

                        >

                          <RiDeleteBinLine />

                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              )

            )}

          </tbody>

        </table>

        {mostrarModal && (

          <CreateLibro

            onClose={() =>

              setMostrarModal(

                false

              )

            }

          />

        )}
        {mostrarCategoria && (

          <CreateCategoria

            onClose={() => {

              setMostrarCategoria(

                false

              );

              obtenerLibros();

            }}

          />

        )}
        {mostrarAdministrar && (

        <AdministrarCategorias

          categorias={categorias}

          onClose={() =>

            setMostrarAdministrar(
              false
            )

          }

          onActualizar={
            obtenerLibros
          }

        />

      )}

        {mostrarEdit &&

          libroSeleccionado && (

            <EditLibro

              libro={

                libroSeleccionado

              }

              onClose={() =>

                setMostrarEdit(

                  false

                )

              }

            />

          )}

        {mostrarDelete &&

          libroSeleccionado && (

            <DeleteLibro

              libro={

                libroSeleccionado

              }

              onClose={() =>

                setMostrarDelete(

                  false

                )

              }

            />

          )}

      </div>

    </Layout>

  );

}

export default Libros;