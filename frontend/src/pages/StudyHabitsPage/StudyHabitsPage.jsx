import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import API from "../../api/index.api";
import Page from "../../components/Page";
import TodayButton from "../StudyDetailPage/components/TodayButton";
import TodayHabits from "./components/TodayHabits";

function StudyHabitsPage() {
  const { studyId } = useParams();
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [isPasswordCorrect, setIspasswordCorrect] = useState(false);
  const [study, setStudy] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const password = location.state;

  const handleClickTodayFocus = () => navigate(`/studies/${studyId}/focus`, { state: password });
  const handleClickTodayHabit = () => navigate(`/studies/${studyId}`);

  useEffect(() => {
    API.studies.checkStudyPassword(studyId, password).then((result) => {
      setIspasswordCorrect(result);
      setIsPasswordConfirmed(true);
    });
  }, [studyId, password]);

  useEffect(() => {
    API.studies.getStudy(studyId).then(setStudy);
  }, [studyId]);

  if (!isPasswordConfirmed) return "인증 중입니다...";
  if (!isPasswordCorrect) return "잘못된 접근입니다";
  if (!study) return "로딩 중입니다...";

  return (
    <Page>
      <section className="bg-white rounded-[20px] p-10 [&+&]:mt-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-extrabold text-[32px] text-black-414141 flex gap-x-0.5 items-center leading-none">
            <span>{study.ownerName}</span>
            <span>의 {study.name}</span>
          </h1>

          <div className="flex gap-x-4 items-center">
            <TodayButton onClick={handleClickTodayFocus}>오늘의 집중</TodayButton>
            <TodayButton onClick={handleClickTodayHabit}>홈</TodayButton>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg text-gray-818181">현재 시간</h2>
          <div className="font-medium inline-block border border-gray-dddddd rounded-[50px] px-3 py-1.5 text-black-414141">
            2024-01-04 오후 3:06
          </div>
        </div>

        <TodayHabits />
      </section>
    </Page>
  );
}

export default StudyHabitsPage;
