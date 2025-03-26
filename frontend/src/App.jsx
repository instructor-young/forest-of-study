import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import CreateStudyPage from "./pages/CreateStudyPage";
import HomePage from "./pages/HomePage";
import StudyDetailPage from "./pages/StudyDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/studies/new" element={<CreateStudyPage />} />
          <Route path="/studies/:studyId" element={<StudyDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
