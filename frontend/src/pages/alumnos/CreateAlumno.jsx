import "./CreateAlumno.css";

import { useState } from "react";

import api from "../../services/api";

import Swal from "sweetalert2";

function CreateAlumno({ onClose }) {

  const [formData, setFormData] = useState({

     nombre: "",
  apellido_paterno: "",
  apellido_materno: "",
  correo: "",
  password: null,
  matricula: "",
  rol: "ALUMNO",
  grado: "",
  grupo: "",
  estado: true,
});

  const handleChange = (e) => {

    const {

      name,

      value,

    } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(

        "/usuarios/",

        {

          ...formData
  }
);

      await Swal.fire({

        icon: "success",

        title: "¡Alumno creado!",

        text:

          "El alumno fue registrado correctamente.",

        confirmButtonColor:

          "#173b70",

      });

      window.location.reload();

    } catch (error) {

      console.error(error);

      Swal.fire({

        icon: "error",

        title: "Error",

        text:

          "No se pudo crear el alumno.",

        confirmButtonColor:

          "#173b70",

      });

    }

  };

  return (

    <div

      className="modal-overlay"

      onClick={onClose}

    >

      <div

        className="modal-content"

        onClick={(e) =>

          e.stopPropagation()

        }

      >

        <h1>

          AGREGAR ALUMNO

        </h1>

        <form

          className="alumno-form"

          onSubmit={handleSubmit}

        >

          <label>

            Nombre:

          </label>

          <input

            type="text"

            name="nombre"
            required

            value={formData.nombre}

            onChange={handleChange}

            placeholder="Ingrese nombre"

          />

          <label>

            Apellido:

          </label>

          <input

            type="text"

            name="apellido_paterno"
            required

            value={

              formData.apellido_paterno

            }

            onChange={handleChange}

            placeholder="Ingrese apellido"

          />

          <label>

            Apellido Materno:

          </label>

          <input

            type="text"

            name="apellido_materno"

            value={

              formData.apellido_materno

            }

            onChange={handleChange}

            placeholder="Ingrese apellido materno"

          />

          <label>

            Correo:

          </label>

          <input

            type="email"

            name="correo"
            required

            value={formData.correo}

            onChange={handleChange}

            placeholder=" Ejemplo: nombre@institutocelestinfreinet.com.mx"

          />

          
          <label>

            Matrícula:

          </label>

          <input

            type="text"

            name="matricula"
            required

            value={formData.matricula}

            onChange={handleChange}

            placeholder="Ejemplo: ALU001"

          />

          <label>

            Grado:

          </label>

          <select
  name="grado"
  value={formData.grado}
  onChange={handleChange}
  required
>
  <option value="">Seleccione un grado</option>
  <option value="1">1°</option>
  <option value="2">2°</option>
  <option value="3">3°</option>
  <option value="4">4°</option>
  <option value="5">5°</option>
  <option value="6">6°</option>
</select>

          <label>

            Grupo:

          </label>

    <select
  name="grupo"
  value={formData.grupo}
  onChange={handleChange}
  required
>
  <option value="">Seleccione un grupo</option>
  <option value="A">A</option>
  <option value="B">B</option>

</select>

         

          <div

            className="botones-form"

          >

            <button

              type="submit"

              className="btn-guardar"

            >

              Guardar

            </button>

            <button

              type="button"

              className="btn-cancelar"

              onClick={onClose}

            >

              Cancelar

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default CreateAlumno;