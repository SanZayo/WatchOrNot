import { useEffect } from "react";
import CarouselFC from "../../Components/CarouselFC";
import HorizontalList from "../../Components/HorizontalList";
// import styles from "./Home.module.css";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CarouselFC />
      <HorizontalList name="now_playing" displayName="In Theaters" />
      <HorizontalList name="upcoming" displayName="Upcoming" />
      <HorizontalList name="popular" displayName="Popular" />
      <HorizontalList name="top_rated" displayName="Top Rated" />
    </>
  );
}

export default Home;
