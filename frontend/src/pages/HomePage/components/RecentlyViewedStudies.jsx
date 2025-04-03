import { useEffect, useState } from "react";
import StudyCard from "../../../components/StudyCard";
import HomeSectionBox from "./HomeSectionBox";

function RecentlyViewedStudies() {
  const [studies, setStudies] = useState(null);

  useEffect(() => {
    setStudies(JSON.parse(localStorage.getItem("recentlyViewedStudies")) || []);
  }, []);

  return (
    <HomeSectionBox title="최근 조회한 스터디">
      {studies === null ? null : studies.length === 0 ? (
        <p className="text-center -mt-7 h-[244px] grid place-items-center text-xl text-gray-818181 font-medium">아직 조회한 스터디가 없어요</p>
      ) : (
        <div className="grid grid-rows-1 grid-flow-col max-w-full overflow-x-auto gap-x-6 w-fit">
          {studies.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>
      )}
    </HomeSectionBox>
  );
}

export default RecentlyViewedStudies;
