import { useContext } from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import Figure from "react-bootstrap/Figure";
import Button from "react-bootstrap/Button";

import useMedia, { MediaType } from "../../Hooks/useMedia";
import useLanguages from "../../Hooks/useLanguages";
import Rating from "../Rating";
import styles from "./CarouselFC.module.scss";
import { AppContext } from "../../Contexts/AppContext";

function CarouselFC() {
  const {
    state: { activeMediaType },
  } = useContext(AppContext);
  const trending: MediaType[] = useMedia(
    "discover/" + activeMediaType,
    1,
    "&sort_by=release_date.desc&vote_average.gte=7.5&vote_count.gte=10"
  );
  const languages = useLanguages();

  return (
    <Carousel fade controls={false} indicators={false}>
      {trending.map((item) => (
        <Carousel.Item key={item.id} className={styles.figureImg}>
          <Row>
            <Col md={4}>
              <Carousel.Caption bsPrefix={styles.carouselCaption}>
                <Figure.Image
                  className={styles.figureImg}
                  src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                />
                <h3>
                  {item.name || item.title}
                  {` `} {item.release_date && `(${item.release_date?.split("-")[0]})`}
                </h3>
                <p>
                  <Rating vote_average={item.vote_average} />
                  {` `}
                  {languages[item.original_language]}
                </p>
                <p className={styles.overview}>{item.overview}</p>
                <div className="actions">
                  {/* <Button variant="light">
                      <i className="bi bi-play-fill"></i> <span>Watch Trailer</span>
                    </Button>
                    {` `} */}
                  <Link to={`/${activeMediaType}/${item.id}`}>
                    <Button variant="light">
                      <i className="bi bi-info-circle"></i> <span>More Info</span>
                    </Button>
                  </Link>
                </div>
              </Carousel.Caption>
            </Col>
            <Col md={8}>
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
