import { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../../api/index.api";
import Page from "../../components/Page";
import Tag from "../../components/Tag";
import ControlButton from "./components/ControlButton";
import HabitRecords from "./components/HabitRecords";
import LinkButton from "./components/LinkButton";

function StudyDetailPage() {
  const [study, setStudy] = useState(null);
  const { studyId } = useParams();

  useEffect(() => {
    API.studies.getStudy(studyId).then(setStudy);
  }, [studyId]);

  if (!study) return "로딩 중...";

  return (
    <Page>
      <section className="bg-white rounded-[20px] p-10 [&+&]:mt-10">
        <div className="flex justify-between items-center">
          <div>이모지 영역</div>
          <div>
            <ControlButton color="green">공유하기</ControlButton>
            <span className="px-4 text-green-text font-medium">|</span>
            <ControlButton color="green">수정하기</ControlButton>
            <span className="px-4 text-gray-818181 font-medium">|</span>
            <ControlButton color="gray">스터디 삭제하기</ControlButton>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8 mt-6">
          <h1 className="font-extrabold text-[32px] text-black-414141 flex gap-x-0.5 items-center leading-none">
            <span>{study.ownerName}</span>
            <span>의 {study.name}</span>
          </h1>

          <div className="flex gap-x-4 items-center">
            <LinkButton to="/">오늘의 습관</LinkButton>
            <LinkButton to="/">오늘의 집중</LinkButton>
          </div>
        </div>

        <div className="mb-10">
          <div className="space-y-2 mt-4">
            <h2 className="text-lg text-gray-818181">소개</h2>
            <p className="text-lg text-black-414141 font-medium whitespace-pre-wrap">
              {study.description}
            </p>
          </div>

          <div className="space-y-2 mt-6">
            <h2 className="text-lg text-gray-818181">현재까지 획득한 포인트</h2>
            <Tag theme="light" type="point" value={310} size="lg" />
          </div>
        </div>

        {/* 습관 기록표 */}
        <HabitRecords />
      </section>
    </Page>
  );
}

export default StudyDetailPage;
