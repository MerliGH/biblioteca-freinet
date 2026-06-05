import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <>
      <Header />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <main
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}

export default Layout;