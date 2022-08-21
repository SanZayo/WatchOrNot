import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button, Carousel, Container, Figure } from "react-bootstrap";
import useMovies, { Movies } from "../../Hooks/useMovies";

import styles from "./index.module.css";
import useLanguages from "../../Hooks/useLanguages";

function CarouselFC() {
  const trending: Movies[] = useMovies(
    "discover/movie",
    20,
    "&sort_by=release_date.desc&vote_average.gte=7.5&vote_count.gte=10"
  );
  const languages = useLanguages();

  return (
    <Carousel fade controls={false} indicators={false}>
      {trending.map((item) => (
        <Carousel.Item key={item.id}>
          <Container fluid>
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
                    <span className={styles.vote}>
                      <i className="bi bi-star-fill"></i>
                      {` `}
                      {item.vote_average}
                    </span>
                    {`/10 `}
                    <i className="bi bi-dot"></i>
                    {` `}
                    {languages[item.original_language]}
                  </p>
                  <p className={styles.overview}>{item.overview}</p>
                  <div className="actions">
                    <Button variant="light">
                      <i className="bi bi-play-fill"></i> <span>Watch Trailer</span>
                    </Button>
                    {` `}
                    <Button variant="outline-light">
                      <i className="bi bi-info-circle"></i> <span>More Info</span>
                    </Button>
                  </div>
                </Carousel.Caption>
              </Col>
              <Col>
                <Figure className={styles.figure}>
                  <div className={styles.carouselFigure}></div>
                  <Figure.Image
                    className="d-block w-100"
                    src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  />
                </Figure>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselFC;
