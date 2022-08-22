import { Card, Col, Container, Figure, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../../Components/Rating";
import useLanguages from "../../Hooks/useLanguages";
import useMediaTypeDetails, { MediaTypeDetails, Result } from "../../Hooks/useMediaTypeDetails";
import map from "lodash/map";
import moment from "moment";

import styles from "./Details.module.scss";
import { useState, useEffect } from "react";

function Details() {
  const [videosList, setVideosList] = useState<Result[]>();
  const [activeVideo, setActiveVideo] = useState<Result>();
  let { type, typeId } = useParams();

  const { mediaDetails, cast, crew }: MediaTypeDetails = useMediaTypeDetails(
    `${type}/${typeId}`,
    "&append_to_response=videos,images,releases,watch/providers"
  );
  const languages = useLanguages();

  const genres: string = Object.keys(mediaDetails).length > 0 ? map(mediaDetails.genres, "name").join(", ") : "";
  const convertToHours = (n: number): string => `${(n / 60) ^ 0}`.slice(-2) + "h " + ("0" + (n % 60)).slice(-2) + "min";
  const languageSpoken =
    Object.keys(mediaDetails).length > 0 ? map(mediaDetails.spoken_languages, "english_name").join(", ") : "";

  useEffect(() => {
    if (Object.keys(mediaDetails).length > 0) {
      const list = mediaDetails.videos.results.filter((video) => video.site === "YouTube");
      setVideosList(list);
      setActiveVideo(list[0]);
    }
  }, [mediaDetails]);

  return (
    <>
      {Object.keys(mediaDetails).length > 0 ? (
        <Row>
          <Col md={3}>
            <div className={styles.mediaDetails}>
              <Figure.Image src={`https://image.tmdb.org/t/p/w300/${mediaDetails.poster_path}`} />
              <h2>
                {mediaDetails.title} ({mediaDetails.release_date.split("-")[0]})
              </h2>
              <p className="d-flex align-items-center justify-content-center gap-1 flex-wrap">
                <span className={styles.certification}>{` ${mediaDetails.releases.countries[0].certification} `}</span>
                {`  `}
                {moment(mediaDetails.releases.countries[0].release_date).format("DD-MM-YYYY")}(
                {mediaDetails.releases.countries[0].iso_3166_1})<i className="bi bi-dot"></i>
                {convertToHours(mediaDetails.runtime)}
                <i className="bi bi-dot"></i>
                {languages[mediaDetails.original_language]}
              </p>
              <p className="d-flex align-items-center justify-content-center gap-1 flex-wrap">
                <Rating vote_average={mediaDetails.vote_average} />
                <i className="bi bi-dot"></i>
                {genres}
              </p>
              {mediaDetails.tagline && (
                <p>
                  <i>{mediaDetails.tagline}</i>
                </p>
              )}
              <p className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
                {mediaDetails["watch/providers"].results.IN.flatrate.map((item, idx) => (
                  <Figure.Image
                    style={{ width: "3rem" }}
                    className={styles.figureImg}
                    src={`https://image.tmdb.org/t/p/w300/${item.logo_path}`}
                    key={idx.toString()}
                  />
                ))}
              </p>
            </div>
          </Col>
          <Col md={9}>
            {activeVideo && (
              <div>
                <iframe
                  width="1270"
                  height="550"
                  src={"https://www.youtube.com/embed/" + activeVideo.key}
                  title={activeVideo.name}
                  className="embed hide"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div></div>
              </div>
            )}
            <div className="mb-5">
              <h5>Overview</h5>
              <p className="text-justify">{mediaDetails.overview}</p>
            </div>
            <div className="mb-5">
              <h5>Languages Spoken</h5>
              {languageSpoken}
            </div>
            <h5>Cast</h5>
            <div className={"mb-5 " + styles.listRow}>
              {cast.length > 0 &&
                cast.map((item, idx) => (
                  <Col key={`${idx}_${item.id}`}>
                    <Card style={{ width: "9rem", height: "100%" }}>
                      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w200${item.profile_path}`} />
                      <Card.Body>
                        <Card.Text bsPrefix="card-title h6">{item.name}</Card.Text>
                        <Card.Text>{item.character}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </div>
            <div className="mb-4 "></div>
          </Col>
        </Row>
      ) : (
        <div className="d-flex align-items-center justify-content-center vh-100 w100">
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </>
  );
}

export default Details;
