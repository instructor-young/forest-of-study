import Page from "../../components/Page";
import StudyCard from "../../components/StudyCard";
import HomeSectionBox from "./components/HomeSectionBox";

const recentViewedStudies = [
  {
    creatorNickname: "K.K",
    name: "UX 스터디",
    point: 310,
    daysFromStart: 62,
    description: "Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :D",
  },
];

function HomePage() {
  return (
    <Page>
      <HomeSectionBox title="최근 조회한 스터디">
        <div className="grid grid-rows-1 grid-flow-col max-w-full overflow-x-auto gap-x-6">
          <StudyCard study={recentViewedStudies[0]} />
          <StudyCard study={recentViewedStudies[0]} />
          <StudyCard study={recentViewedStudies[0]} />
          <StudyCard study={recentViewedStudies[0]} />
        </div>
      </HomeSectionBox>
      <HomeSectionBox title="스터디 둘러보기">
        <div className="grid grid-cols-3 gap-6">
          <StudyCard study={recentViewedStudies[0]} />
          <StudyCard study={recentViewedStudies[0]} />
          <StudyCard study={recentViewedStudies[0]} />
          <StudyCard study={recentViewedStudies[0]} />
          <StudyCard study={recentViewedStudies[0]} />
          <StudyCard study={recentViewedStudies[0]} />
          <StudyCard study={recentViewedStudies[0]} />
          <StudyCard study={recentViewedStudies[0]} />
          <StudyCard study={recentViewedStudies[0]} />
        </div>
      </HomeSectionBox>
    </Page>
  );
}

export default HomePage;
