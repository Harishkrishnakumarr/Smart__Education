import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentSummary } from "../api/studentApi";

function StudentSummaryPage() {
  const { id } = useParams();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getStudentSummary(id);
        setSummary(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load summary");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!summary) return <p>No data</p>;

  return (
    <div style={{ background: "white", padding: "1rem", borderRadius: "0.5rem" }}>
      <h1 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>
        Summary – {summary.studentName}
      </h1>

      <h2 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Chapter-wise Average Score</h2>
      <ul style={{ marginLeft: "1.25rem", marginBottom: "1rem" }}>
        {summary.chapterScoreMap &&
          Object.entries(summary.chapterScoreMap).map(([ch, avg]) => (
            <li key={ch}>
              {ch}: {avg.toFixed(2)}%
            </li>
          ))}
      </ul>

      <h2 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>AI Summary</h2>
      <p style={{ whiteSpace: "pre-wrap", marginBottom: "1rem" }}>
        {summary.aiSummary}
      </p>

      <h2 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Next Actions (Plan)</h2>
      <p style={{ whiteSpace: "pre-wrap" }}>{summary.aiNextActions}</p>
    </div>
  );
}

export default StudentSummaryPage;
