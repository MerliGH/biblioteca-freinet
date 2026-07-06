import "./Login.css";

import { useState } from "react";

import api from "../../services/api";

function Login() {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);
      setError("");

      const response = await api.post(
        "/auth/login",
        {
          correo,
          password,
        }
      );

      const usuario = response.data;

      const usuariosResponse = await api.get(
        "/usuarios/"
      );

      const usuarioCompleto =
        usuariosResponse.data.find(
          (u) =>
            u.id_usuario ===
            usuario.id_usuario
        );

      console.log(
        "LOGIN:",
        usuario
      );

      console.log(
        "USUARIO COMPLETO:",
        usuarioCompleto
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify(
          usuarioCompleto
        )
      );

      window.location.href =
        "/dashboard";

    } catch (error) {

      console.error(error);

      setError(
        "Correo o contraseña incorrectos"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="login-container">

      <div className="login-card">

        <img
          src="/LOGO_RECORTADO.png"
          alt="Biblioteca Freinet"
          className="logo-login"
        />

        <h1>
          Biblioteca Freinet
        </h1>

        <p className="subtitulo">
          Sistema de Gestión Bibliotecaria
        </p>

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

          <label>
            Correo electrónico
          </label>

          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={correo}
            onChange={(e) =>
              setCorreo(
                e.target.value
              )
            }
            required
          />

          <label>
            Contraseña
          </label>

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Ingresando..."
              : "Iniciar Sesión"}

          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;

