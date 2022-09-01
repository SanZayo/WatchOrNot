import { useContext, useEffect } from "react";
import CarouselFC from "../../Components/CarouselFC";
import { AppContext } from "../../Contexts/AppContext";
// import styles from "./Home.module.css";
import MoviesList from "./MoviesList";

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
          <MoviesList name="now_playing" displayName="In Theaters" />
          <MoviesList name="upcoming" displayName="Upcoming" />
        </>
      )}
      <MoviesList name="popular" displayName="Popular" />
      <MoviesList name="top_rated" displayName="Top Rated" />
    </>
  );
}

export default Home;
