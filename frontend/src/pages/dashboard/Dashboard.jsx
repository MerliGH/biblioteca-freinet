import Layout from "../../components/Layout";
import "../Dashboard.css";

function Dashboard() {
  return (
    <Layout>
      <h1 className="dashboard-title">
        Bienvenida, Mtra. Elizabeth
      </h1>

      <p className="dashboard-subtitle">
        Sistema de control de biblioteca escolar
      </p>
    </Layout>
  );
}

export default Dashboard;