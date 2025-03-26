import { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../../api/index.api";
import Page from "../../components/Page";
import ControlButton from "./components/ControlButton";

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

        <div>
          <h1 className="font-extrabold text-[32px] text-black-414141 mb-8 flex gap-x-0.5 items-center">
            <span>{study.ownerName}</span>
            <span>의 {study.name}</span>
          </h1>
        </div>

        <div>소개</div>

        <div>포인트</div>

        {/* 습관 기록표 */}
      </section>
    </Page>
  );
}

export default StudyDetailPage;
