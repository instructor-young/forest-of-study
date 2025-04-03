import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import API from "../../../api/index.api";
import Search from "../../../components/Search";
import Sorting from "../../../components/Sorting";
import StudyCard from "../../../components/StudyCard";
import HomeSectionBox from "./HomeSectionBox";

function AllStudies() {
  const [studies, setStudies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const maxPage = Math.ceil(studies.length / 6);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const orderBy = searchParams.get("orderBy");

  useEffect(() => {
    setCurrentPage(1);
  }, [query, orderBy]);

  useEffect(() => {
    API.studies.getStudies().then(setStudies);
  }, []);

  const filteredStudies = useMemo(
    () => studies.filter((study) => study.ownerName.includes(query) || study.name.includes(query)),
    [studies, query]
  );

  const sortedStudies = useMemo(() => {
    const studies = [...filteredStudies];
    if (orderBy === "createdAt,desc") {
      studies.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)));
    } else if (orderBy === "createdAt,asc") {
      studies.sort((a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt)));
    } else if (orderBy === "point,desc") {
      studies.sort((a, b) => b.point - a.point);
    } else if (orderBy === "point,asc") {
      studies.sort((a, b) => a.point - b.point);
    }

    return studies;
  }, [filteredStudies, orderBy]);

  const visibleStudies = useMemo(() => sortedStudies.slice(0, pageSize * currentPage), [pageSize, sortedStudies, currentPage]);

  return (
    <HomeSectionBox title="스터디 둘러보기">
      <header className="-mt-2 mb-6 flex justify-between items-center">
        <Search />
        <Sorting />
      </header>

      <div className="grid grid-cols-3 gap-6">
        {visibleStudies.map((study) => (
          <StudyCard key={study.id} study={study} />
        ))}
      </div>

      {currentPage !== maxPage && (
        <div className="grid place-items-center mt-[60px]">
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="border border-gray-dddddd rounded-[20px] h-[54px] w-[280px] text-green-text font-medium hover:brightness-95 active:brightness-90 transition bg-white"
          >
            더 보기
          </button>
        </div>
      )}
    </HomeSectionBox>
  );
}

export default AllStudies;
