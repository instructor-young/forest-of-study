import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { ModalProvider } from "./contexts/modal.context";
import CreateStudyPage from "./pages/CreateStudyPage";
import EditStudyPage from "./pages/EditStudyPage";
import HomePage from "./pages/HomePage";
import StudyDetailPage from "./pages/StudyDetailPage";
import StudyHabitsPage from "./pages/StudyHabitsPage";

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/studies/new" element={<CreateStudyPage />} />
            <Route path="/studies/:studyId" element={<StudyDetailPage />} />
            <Route path="/studies/:studyId/edit" element={<EditStudyPage />} />
            <Route path="/studies/:studyId/habits" element={<StudyHabitsPage />} />
            <Route path="/studies/:studyId/focus" element={<EditStudyPage />} />
          </Route>
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
