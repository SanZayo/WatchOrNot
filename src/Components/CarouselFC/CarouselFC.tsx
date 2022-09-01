import { useContext } from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import Figure from "react-bootstrap/Figure";
import Button from "react-bootstrap/Button";
import { useQuery } from "@tanstack/react-query";

import Rating from "../Rating";
import styles from "./CarouselFC.module.scss";
import { AppContext } from "../../Contexts/AppContext";
import getAllContents, { IContentsList } from "../../API/getAllContents";
import { IGetAllContentsArgs } from "./../../API/getAllContents";
import Loading from "../Loading";

function CarouselFC() {
  const {
    state: { activeMediaType, languages, activeLanguages },
  } = useContext(AppContext);
  const allLanguages = languages.allLanguages;
  const args: IGetAllContentsArgs = {
    endpoint: "discover/" + activeMediaType,
    filter: "&sort_by=release_date.desc&vote_average.gte=7.5&vote_count.gte=10",
    activeLanguages,
  };

  const { isLoading, isError, data, error } = useQuery<IContentsList[]>([activeMediaType, Object.values(args)], () =>
    getAllContents(args)
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <>Something went wrong! {error}</>;
  }

  return (
    <Carousel fade controls={false} indicators={false}>
      {data.map((item) => (
        <Carousel.Item key={item.id} className={styles.figureImg}>
          <Row>
            <Col md={4}>
              <Carousel.Caption bsPrefix={styles.carouselCaption}>
                <Figure.Image
                  className={styles.figureImg}
                  src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                  loading="lazy"
                />
                <h3>
                  {"name" in item ? item.name : item.title}
                  {` `} {item.release_date && `(${item.release_date?.split("-")[0]})`}
                </h3>
                <p>
                  <Rating vote_average={item.vote_average} />
                  {` `}
                  {allLanguages && allLanguages[item.original_language]}
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
                  loading="lazy"
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
