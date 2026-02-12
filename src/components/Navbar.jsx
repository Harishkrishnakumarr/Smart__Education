import { Link, NavLink } from "react-router-dom";

const linkStyle = {
  padding: "0.25rem 0.75rem",
  borderRadius: "999px",
  fontSize: "0.9rem",
};

function Navbar() {
  const getClassName = ({ isActive }) => ({
    ...linkStyle,
    backgroundColor: isActive ? "#2563eb" : "transparent",
    color: isActive ? "white" : "#111827",
  });

  return (
    <nav
      style={{
        width: "100%",
        borderBottom: "1px solid #e5e7eb",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "0.75rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ fontWeight: 600, fontSize: "1.1rem", color: "#2563eb" }}>
          SmartEdu
        </Link>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <NavLink to="/students" style={getClassName}>
            Students
          </NavLink>
          <NavLink to="/generate-test" style={getClassName}>
            Generate Test
          </NavLink>
          <NavLink to="/my-tests" style={getClassName}>
            My Tests
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
