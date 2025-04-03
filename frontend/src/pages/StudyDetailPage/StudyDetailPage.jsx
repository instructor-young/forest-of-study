import { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../../api/index.api";
import Page from "../../components/Page";
import PasswordModal from "../../components/PasswordModal";
import Tag from "../../components/Tag";
import { useModal } from "../../contexts/modal.context";
import ControlButton from "./components/ControlButton";
import EmojiZone from "./components/EmojiZone";
import HabitRecords from "./components/HabitRecords";
import TodayButton from "./components/TodayButton";

function StudyDetailPage() {
  const [study, setStudy] = useState(null);
  const { studyId } = useParams();
  const modal = useModal();

  const handleClickEdit = () => modal.open(<PasswordModal study={study} type="edit" />);
  const handleClickDelete = () => modal.open(<PasswordModal study={study} type="delete" />);
  const handleClickTodayHabit = () => modal.open(<PasswordModal study={study} type="habits" />);
  const handleClickTodayFocus = () => modal.open(<PasswordModal study={study} type="focus" />);

  useEffect(() => {
    API.studies.getStudy(studyId).then(setStudy);
  }, [studyId]);

  useEffect(() => {
    if (!study) return;
    const recentlyViewedStudies = JSON.parse(localStorage.getItem("recentlyViewedStudies")) || [];
    const newRecentlyViewedStudies = [study, ...recentlyViewedStudies.filter((s) => s.id !== study.id)];

    localStorage.setItem("recentlyViewedStudies", JSON.stringify(newRecentlyViewedStudies));
  }, [study]);

  if (!study) return "로딩 중...";

  return (
    <Page>
      <section className="bg-white rounded-[20px] p-10 [&+&]:mt-10">
        <div className="flex justify-between items-center">
          <EmojiZone />

          <div>
            <ControlButton color="green">공유하기</ControlButton>
            <span className="px-4 text-green-text font-medium">|</span>
            <ControlButton color="green" onClick={handleClickEdit}>
              수정하기
            </ControlButton>
            <span className="px-4 text-gray-818181 font-medium">|</span>
            <ControlButton color="gray" onClick={handleClickDelete}>
              스터디 삭제하기
            </ControlButton>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8 mt-6">
          <h1 className="font-extrabold text-[32px] text-black-414141 flex gap-x-0.5 items-center leading-none">
            <span>{study.ownerName}</span>
            <span>의 {study.name}</span>
          </h1>

          <div className="flex gap-x-4 items-center">
            <TodayButton onClick={handleClickTodayHabit}>오늘의 습관</TodayButton>
            <TodayButton onClick={handleClickTodayFocus}>오늘의 집중</TodayButton>
          </div>
        </div>

        <div className="mb-10">
          <div className="space-y-2 mt-4">
            <h2 className="text-lg text-gray-818181">소개</h2>
            <p className="text-lg text-black-414141 font-medium whitespace-pre-wrap">{study.description}</p>
          </div>

          <div className="space-y-2 mt-6">
            <h2 className="text-lg text-gray-818181">현재까지 획득한 포인트</h2>
            <Tag theme="light" type="point" value={study.point} size="lg" />
          </div>
        </div>

        {/* 습관 기록표 */}
        <HabitRecords habits={study.habits} />
      </section>
    </Page>
  );
}

export default StudyDetailPage;
