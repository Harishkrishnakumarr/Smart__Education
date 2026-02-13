import { useParams } from "react-router-dom";
import { getWeaknessSummary } from "../api/analyticsApi";

function StudentWeaknessPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getWeaknessSummary(id);
        setData(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load weakness summary");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data.</p>;

  return (
    <div style={{ background: "white", padding: "1rem", borderRadius: "0.5rem" }}>
      <h1 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>
        Weak Areas – {data.studentName || ""}
      </h1>
      <pre style={{ whiteSpace: "pre-wrap" }}>{data.aiSummary || data.details}</pre>
    </div>
  );
}

export default StudentWeaknessPage;
