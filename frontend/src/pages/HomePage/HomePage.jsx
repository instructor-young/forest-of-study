import Page from "../../components/Page";
import AllStudies from "./components/AllStudies";
import RecentViewedStudies from "./components/RecentViewedStudies";

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
      <RecentViewedStudies />

      <AllStudies />
    </Page>
  );
}

export default HomePage;
