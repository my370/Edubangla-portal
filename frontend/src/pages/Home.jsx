import Hero from "../components/home/Hero";
import Statistics from "../components/home/Statistics";
import Categories from "../components/home/Categories";
import Divisions from "../components/home/Divisions";
import Districts from "../components/home/Districts";
import FeaturedInstitutions from "../components/home/FeaturedInstitutions";
import LatestNews from "../components/home/LatestNews";

function Home() {
  return (
    <>
      <Hero />
      <Statistics />
      <Categories />
      <Divisions />
      <Districts />
      <FeaturedInstitutions />
      <LatestNews />
    </>
  );
}

export default Home;
