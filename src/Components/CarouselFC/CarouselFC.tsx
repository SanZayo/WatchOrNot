import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button, Carousel, Container, Figure } from "react-bootstrap";
import useMediaType, { MediaType } from "../../Hooks/useMediaType";

import styles from "./CarouselFC.module.css";
import useLanguages from "../../Hooks/useLanguages";
import Rating from "../Rating";
import { Link } from "react-router-dom";

function CarouselFC() {
  const trending: MediaType[] = useMediaType(
    "discover/movie",
    2,
    "&sort_by=release_date.desc&vote_average.gte=7.5&vote_count.gte=10"
  );
  const languages = useLanguages();

  return (
    <Carousel fade controls={false} indicators={false}>
      {trending.map((item) => (
        <Carousel.Item key={item.id}>
          <Row>
            <Col md={4}>
              <Carousel.Caption bsPrefix={styles.carouselCaption}>
                <Figure.Image
                  className={styles.figureImg}
                  src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                />
                <h2>
                  {item.name || item.title} ({item.release_date?.split("-")[0]})
                </h2>
                <p>
                  <Rating vote_average={item.vote_average} />
                  <i className="bi bi-dot"></i>
                  {` `}
                  {languages[item.original_language]}
                </p>
                <p className={styles.overview}>{item.overview}</p>
                <div className="actions">
                  {/* <Button variant="light">
                      <i className="bi bi-play-fill"></i> <span>Watch Trailer</span>
                    </Button>
                    {` `} */}
                  <Link to={`/movie/${item.id}`}>
                    <Button variant="light">
                      <i className="bi bi-info-circle"></i> <span>More Info</span>
                    </Button>
                  </Link>
                </div>
              </Carousel.Caption>
            </Col>
            <Col md={6}>
              <Figure className={styles.figure}>
                <div className={styles.carouselFigure}></div>
                <Figure.Image
                  className="d-block w-100"
                  src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                />
              </Figure>
            </Col>
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselFC;
