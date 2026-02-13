import { useEffect, useState } from "react";
import { getAllStudents, deleteStudent } from "../api/studentApi";
import { useNavigate } from "react-router-dom";

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const res = await getAllStudents();
      setStudents(res.data);
    } catch (e) {
      console.error(e);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Students</h1>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/students/add")}
        >
          + Add Student
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table style={{ width: "100%", background: "white", borderRadius: "0.5rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>ID</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Name</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Class</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Section</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Parent Email</th>
              <th style={{ textAlign: "center", padding: "0.5rem" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} style={{ borderTop: "1px solid #e5e7eb" }}>
                <td style={{ padding: "0.5rem" }}>{s.id}</td>
                <td style={{ padding: "0.5rem" }}>{s.name}</td>
                <td style={{ padding: "0.5rem" }}>{s.schoolClass?.classname}</td>
                <td style={{ padding: "0.5rem" }}>{s.section}</td>
                <td style={{ padding: "0.5rem" }}>{s.parentEmail}</td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  <button
                    className="btn btn-secondary"
                    style={{ marginRight: "0.25rem" }}
                    onClick={() => navigate(`/students/${s.id}/summary`)}
                  >
                    Summary
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{ marginRight: "0.25rem" }}
                    onClick={() => navigate(`/students/${s.id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentsPage;
