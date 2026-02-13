import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTestsForStudent } from "../api/studentApi";

function StudentTestsPage() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const studentId = 1; // TODO: replace with logged-in student id

  useEffect(() => {
    (async () => {
      try {
        const res = await getTestsForStudent(studentId);
        setTests(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load tests");
      } finally {
        setLoading(false);
      }
    })();
  }, [studentId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>My Tests</h1>
      {tests.length === 0 ? (
        <p>No tests assigned</p>
      ) : (
        <table style={{ width: "100%", background: "white", borderRadius: "0.5rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>ID</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Chapter</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Difficulty</th>
              <th style={{ textAlign: "center", padding: "0.5rem" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((t) => (
              <tr key={t.id} style={{ borderTop: "1px solid #e5e7eb" }}>
                <td style={{ padding: "0.5rem" }}>{t.id}</td>
                <td style={{ padding: "0.5rem" }}>{t.chapter?.name || "-"}</td>
                <td style={{ padding: "0.5rem" }}>{t.difficulty}</td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`api/take-test/${t.id}`)}
                  >
                    Take Test
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

export default StudentTestsPage;
