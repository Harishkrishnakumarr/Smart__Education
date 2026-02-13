import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAiTestById } from "../api/aiTestApi";

function DisplayGeneratedTestPage() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAiTestById(id);
        setTest(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load test");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <p>Loading...</p>;
  if (!test) return <p>Test not found.</p>;

  return (
    <div>
      <div
        className="no-print"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>
          AI Generated Test #{test.id}
        </h1>
        <button className="btn btn-primary" onClick={handlePrint}>
          Print / Save as PDF
        </button>
      </div>

      <div
        id="print-area"
        style={{
          background: "white",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
      >
        <h2 style={{ fontWeight: 600, marginBottom: "0.75rem" }}>
          Difficulty: {test.difficulty}
        </h2>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            fontSize: "0.9rem",
            background: "#f3f4f6",
            padding: "0.75rem",
            borderRadius: "0.375rem",
          }}
        >
          {test.questionsText || test.questions || test.generatedQuestions}
        </pre>
      </div>
    </div>
  );
}

export default DisplayGeneratedTestPage;
