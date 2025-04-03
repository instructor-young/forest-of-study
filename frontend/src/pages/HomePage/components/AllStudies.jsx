import { useEffect, useState } from "react";
import API from "../../../api/index.api";
import Search from "../../../components/Search";
import Sorting from "../../../components/Sorting";
import StudyCard from "../../../components/StudyCard";
import HomeSectionBox from "./HomeSectionBox";

function AllStudies() {
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    API.studies.getStudies().then(setStudies);
  }, []);

  return (
    <HomeSectionBox title="스터디 둘러보기">
      <header className="-mt-2 mb-6 flex justify-between items-center">
        <Search />
        <Sorting />
      </header>
      <div className="grid grid-cols-3 gap-6">
        {studies.map((study) => (
          <StudyCard key={study.id} study={study} />
        ))}
      </div>
    </HomeSectionBox>
  );
}

export default AllStudies;
