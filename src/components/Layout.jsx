import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f3f4f6" }}>
      <Navbar />
      <main
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "1.5rem 1rem",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;
