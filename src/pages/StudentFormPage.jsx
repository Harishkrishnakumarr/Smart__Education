import { useEffect, useState } from "react";
import { createStudent, getStudent, updateStudent } from "../api/studentApi";
import { useNavigate, useParams } from "react-router-dom";

const emptyForm = {
  name: "",
  className: "",
  section: "",
  parentEmail: "",
};

function StudentFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const res = await getStudent(id);
          setForm({
            name: res.data.name || "",
            schoolClassId: res.data.schoolClass?.id|| "",
            section: res.data.section || "",
            parentEmail: res.data.parentEmail || "",
          });
        } catch (err) {
          console.error(err);
          alert("Failed to load student");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateStudent(id, form);
      } else {
        await createStudent(form);
      }
      navigate("/api/students");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "480px" }}>
      <h1 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>
        {isEdit ? "Edit Student" : "Add Student"}
      </h1>

      <form onSubmit={handleSubmit} style={{ background: "white", padding: "1rem", borderRadius: "0.5rem" }}>
        <div style={{ marginBottom: "0.75rem" }}>
          <label className="block text-sm mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
          />
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label className="block text-sm mb-1">Class</label>
          <input
            name="clazz"
            value={form.clazz}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
          />
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label className="block text-sm mb-1">Section</label>
          <input
            name="section"
            value={form.section}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
          />
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label className="block text-sm mb-1">Parent Email</label>
          <input
            name="parentEmail"
            type="email"
            value={form.parentEmail}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default StudentFormPage;
