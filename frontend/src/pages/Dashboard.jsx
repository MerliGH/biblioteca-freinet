import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <>
      <Header />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <main className="dashboard-content">
          <h1 className="dashboard-title">
            Bienvenida, Mtra. Elizabeth
          </h1>

          <p className="dashboard-subtitle">
            Sistema de control de biblioteca escolar
          </p>
        </main>
      </div>
    </>
  );
}

export default Dashboard;