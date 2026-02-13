import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAiTestById } from "../api/aiTestApi";
import api from "../api/apiClient";

function TakeTestPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [answersText, setAnswersText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const studentId = 1; // TODO: from auth

  useEffect(() => {
    (async () => {
      try {
        const res = await getAiTestById(testId);
        setTest(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load test");
      }
    })();
  }, [testId]);

  const handleSubmit = async () => {
    if (!answersText.trim()) {
      alert("Please write your answers.");
      return;
    }
    setSubmitting(true);
    try {
      await api.post(`/api/tests/${testId}/submit`, {
        answersText,
        studentId,
      });
      alert("Test submitted!");
      navigate("/my-tests");
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (!test) return <p>Loading...</p>;

  return (
    <div>
      <h1 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>
        Take Test #{test.id}
      </h1>

      <div style={{ background: "white", padding: "1rem", borderRadius: "0.5rem" }}>
        <h2 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Questions</h2>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            fontSize: "0.9rem",
            background: "#f3f4f6",
            padding: "0.75rem",
            borderRadius: "0.375rem",
            marginBottom: "1rem",
          }}
        >
          {test.questionsText || test.questions || test.generatedQuestions}
        </pre>

        <label className="block text-sm mb-1">Your Answers</label>
        <textarea
          rows={10}
          value={answersText}
          onChange={(e) => setAnswersText(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
          placeholder="Write answers as 1) A, 2) B ... or full explanation as needed"
        />

        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          style={{ marginTop: "0.75rem" }}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Test"}
        </button>
      </div>
    </div>
  );
}

export default TakeTestPage;
