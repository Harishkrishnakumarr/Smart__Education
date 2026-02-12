  import { useEffect, useState } from "react";
import api from "../api/apiClient";
import { generateAiTest } from "../api/aiTestApi";

function GenerateTestPage() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);

  const [form, setForm] = useState({
    classId: "",
    subjectId: "",
    chapterId: "",
    difficulty: "MEDIUM",
    numberOfQuestions: 5,
    studentId: "",
  });

  const [generatedTest, setGeneratedTest] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/api/classes").then((res) => setClasses(res.data));
    

    
  }, []);

  useEffect(() => {
    if (form.classId) {
      api.get(`api/subjects/class/${form.classId}`).then((res) => setSubjects(res.data));
    } else {
      setSubjects([]);
      setChapters([]);
    }
  }, [form.classId]);

  useEffect(() => {
    if (form.subjectId) {
      api.get(`api/chapters/subject/${form.subjectId}`).then((res) => setChapters(res.data));
    } else {
      setChapters([]);
    }
  }, [form.subjectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedTest(null);
    try {
      const payload = {
        classId: Number(form.classId),
        subjectId: Number(form.subjectId),
        chapterId: Number(form.chapterId),
        difficulty: form.difficulty,
        numberOfQuestions: Number(form.numberOfQuestions),
        studentId: form.studentId ? Number(form.studentId) : null,
      };
      const res = await generateAiTest(payload);
      setGeneratedTest(res.data);
    } catch (err) {
      console.error(err);
      alert("AI test generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>
        AI Test Generator
      </h1>

      <form
        onSubmit={handleGenerate}
        style={{ background: "white", padding: "1rem", borderRadius: "0.5rem", maxWidth: "520px" }}
      >
        <div style={{ marginBottom: "0.75rem" }}>
          <label className="block text-sm mb-1">Class</label>
          <select
            name="classId"
            value={form.classId}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
          >
            <option value="">Select Class</option>
           {classes.map((c) => (
  <option key={c.id} value={c.id}>
    {c.classname}
  </option>
))}
          </select>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label className="block text-sm mb-1">Subject</label>
          <select
            name="subjectId"
            value={form.subjectId}
            onChange={handleChange}
            required
            disabled={!form.classId}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label className="block text-sm mb-1">Chapter</label>
          <select
            name="chapterId"
            value={form.chapterId}
            onChange={handleChange}
            required
            disabled={!form.subjectId}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
          >
            <option value="">Select Chapter</option>
            {chapters.map((ch) => (
              <option key={ch.id} value={ch.id}>
                {ch.name || ch.chapterName}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label className="block text-sm mb-1">Difficulty</label>
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label className="block text-sm mb-1">Number of Questions</label>
          <input
            type="number"
            name="numberOfQuestions"
            min="1"
            max="20"
            value={form.numberOfQuestions}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
          />
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label className="block text-sm mb-1">
            Assign to Student ID (optional)
          </label>
          <input
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            placeholder="e.g. 1"
            style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Generating..." : "Generate Test"}
        </button>
      </form>

      {generatedTest && (
        <div style={{ marginTop: "1.5rem", background: "white", padding: "1rem", borderRadius: "0.5rem" }}>
          <h2 style={{ fontWeight: 600, marginBottom: "0.75rem" }}>Generated Test</h2>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.9rem", background: "#f3f4f6", padding: "0.75rem", borderRadius: "0.375rem" }}>
            {generatedTest.questionsText || generatedTest.questions || generatedTest.generatedQuestions}
          </pre>
        </div>
      )}
    </div>
  );
}

export default GenerateTestPage;
