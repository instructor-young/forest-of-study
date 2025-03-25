import { useEffect, useState } from "react";
import API from "../../../api/index.api";
import StudyCard from "../../../components/StudyCard";
import HomeSectionBox from "./HomeSectionBox";

function RecentViewedStudies() {
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    API.studies.getStudies().then(setStudies);
  }, []);

  return (
    <HomeSectionBox title="최근 조회한 스터디">
      <div className="grid grid-rows-1 grid-flow-col max-w-full overflow-x-auto gap-x-6">
        {studies.map((study) => (
          <StudyCard key={study.id} study={study} />
        ))}
      </div>
    </HomeSectionBox>
  );
}

export default RecentViewedStudies;
