import { useContext, useEffect } from "react";
import CarouselFC from "../../Components/CarouselFC";
import HorizontalList from "../../Components/HorizontalList";
import { AppContext } from "../../Contexts/AppContext";
// import styles from "./Home.module.css";

function Home() {
  const {
    state: { activeMediaType },
  } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CarouselFC />
      {activeMediaType === "movie" && (
        <>
          <HorizontalList name="now_playing" displayName="In Theaters" />
          <HorizontalList name="upcoming" displayName="Upcoming" />
        </>
      )}
      <HorizontalList name="popular" displayName="Popular" />
      <HorizontalList name="top_rated" displayName="Top Rated" />
    </>
  );
}

export default Home;
