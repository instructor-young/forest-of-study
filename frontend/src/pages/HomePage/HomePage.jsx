import Page from "../../components/Page";
import AllStudies from "./components/AllStudies";
import RecentlyViewedStudies from "./components/RecentlyViewedStudies";

function HomePage() {
  return (
    <Page>
      <RecentlyViewedStudies />
      <AllStudies />
    </Page>
  );
}

export default HomePage;
