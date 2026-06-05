import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";

import Libros from "./pages/libros/Libros";
import CreateLibro from "./pages/libros/CreateLibro";
import EditLibro from "./pages/libros/EditLibro";
import DeleteLibro from "./pages/libros/DeleteLibro";

import Alumnos from "./pages/alumnos/Alumnos";
import CreateAlumno from "./pages/alumnos/CreateAlumno";
import EditAlumno from "./pages/alumnos/EditAlumno";
import DeleteAlumno from "./pages/alumnos/DeleteAlumno";

import Docentes from "./pages/docentes/Docentes";
import CreateDocente from "./pages/docentes/CreateDocente";
import EditDocente from "./pages/docentes/EditDocente";
import DeleteDocente from "./pages/docentes/DeleteDocente";

import Termometro from "./pages/termometro/Termometro";

import Prestamos from "./pages/Prestamos";
import Historial from "./pages/Historial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Libros */}
        <Route path="/libros" element={<Libros />} />
        {/* Alumnos */}
        <Route path="/alumnos" element={<Alumnos />} />
        {/* Docentes */}
        <Route path="/docentes" element={<Docentes />} />
        {/* Termómetro */}
        <Route path="/termometro" element={<Termometro />} />
        {/* Libros submenu */}
        <Route path="/prestamos" element={<Prestamos />} />
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;