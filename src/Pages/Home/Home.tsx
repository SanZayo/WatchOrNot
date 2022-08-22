import { Container } from "react-bootstrap";
import CarouselFC from "../../Components/CarouselFC";
import Header from "../../Components/Header";
import HorizontalList from "../../Components/HorizontalList";
// import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <CarouselFC />
      <HorizontalList name="now_playing" displayName="Now Playing" />
      <HorizontalList name="upcoming" displayName="Upcoming" />
      <HorizontalList name="popular" displayName="Popular" />
      <HorizontalList name="top_rated" displayName="Top Rated" />
    </>
  );
}

export default Home;
