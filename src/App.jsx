import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import StudentsPage from "./pages/StudentsPage";
import StudentFormPage from "./pages/StudentFormPage";
import StudentSummaryPage from "./pages/StudentSummaryPage";
import GenerateTestPage from "./pages/GenerateTestPage";
import StudentTestsPage from "./pages/StudentTestsPage";
import TakeTestPage from "./pages/TakeTestPage";
import DisplayGeneratedTestPage from "./pages/DisplayGeneratedTestPage";
import StudentWeaknessPage from "./pages/StudentWeaknessPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/students" replace />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/add" element={<StudentFormPage />} />
        <Route path="/students/:id/edit" element={<StudentFormPage />} />
        <Route path="/students/:id/summary" element={<StudentSummaryPage />} />
        <Route path="/students/:id/weakness" element={<StudentWeaknessPage />} />
        <Route path="/generate-test" element={<GenerateTestPage />} />
        <Route path="/ai-tests/:id" element={<DisplayGeneratedTestPage />} />
        <Route path="/my-tests" element={<StudentTestsPage />} />
        <Route path="/take-test/:testId" element={<TakeTestPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
