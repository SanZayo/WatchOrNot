import { Badge, Button, ButtonGroup, Card, Col, Container, Figure, Row } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import Rating from "../../Components/Rating";
import useLanguages from "../../Hooks/useLanguages";
import useMediaTypeDetails, { Flatrate, In, MediaTypeDetails, VideoResults } from "../../Hooks/useMediaTypeDetails";
import map from "lodash/map";
import find from "lodash/find";
import uniqBy from "lodash/uniqBy";
import moment from "moment";

import styles from "./Details.module.scss";
import { useState, useEffect } from "react";
import Loading from "../../Components/Loading";
import Trailer from "../../Components/Trailer";

type DetailsProp = {
  type: string;
};

function Details({ type }: DetailsProp) {
  const location = useLocation();
  const [videosList, setVideosList] = useState<VideoResults[]>();
  const [activeVideo, setActiveVideo] = useState<VideoResults>();
  let { typeId } = useParams();

  const { mediaDetails, cast, crew }: MediaTypeDetails = useMediaTypeDetails(
    `${type}/${typeId}`,
    "&append_to_response=videos,images,releases,watch/providers,recommendations,translations"
  );
  const languages = useLanguages();

  const genres: string = Object.keys(mediaDetails).length > 0 ? map(mediaDetails.genres, "name").join(", ") : "";
  const convertToHours = (n: number): string => `${(n / 60) ^ 0}`.slice(-2) + "h " + ("0" + (n % 60)).slice(-2) + "min";
  const languageSpoken =
    Object.keys(mediaDetails).length > 0 ? map(mediaDetails.spoken_languages, "english_name").join(", ") : "";

  const certificate =
    Object.keys(mediaDetails).length > 0 ? find(mediaDetails.releases.countries, ["iso_3166_1", "IN"]) : "";

  let watchProviders: Flatrate[] = [];
  if (Object.keys(mediaDetails).length > 0 && mediaDetails["watch/providers"].results.IN) {
    const types = mediaDetails["watch/providers"].results.IN as any;
    const watchTypes: Flatrate[] = [];
    Object.keys(types).forEach((item: string) => {
      if (Array.isArray(types[item])) {
        watchTypes.push(...types[item]);
      }
    });
    watchProviders = uniqBy(watchTypes, "provider_id");
  }

  useEffect(() => {
    if (Object.keys(mediaDetails).length > 0) {
      const list = mediaDetails.videos.results.filter((video) => video.site === "YouTube");
      setVideosList(list);
      setActiveVideo(list[0]);
    }
  }, [mediaDetails]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type, typeId]);

  return (
    <>
      {Object.keys(mediaDetails).length > 0 ? (
        <Row>
          <Col md={3}>
            <div className={styles.mediaDetails}>
              <Figure.Image
                className={styles.figureImg}
                src={`https://image.tmdb.org/t/p/w300/${mediaDetails.poster_path}`}
              />
              <h3>
                {mediaDetails.title} ({mediaDetails.release_date.split("-")[0]})
              </h3>
              {mediaDetails.tagline && (
                <p>
                  <i>{mediaDetails.tagline}</i>
                </p>
              )}
              <p className="d-flex align-items-center justify-content-center gap-1 flex-wrap">
                {certificate && (
                  <>
                    {certificate["certification"] && (
                      <span className={styles.certification}>{` ${certificate["certification"]} `}</span>
                    )}
                    {`  `}
                    {moment(mediaDetails.releases.countries[0].release_date).format("DD-MM-YYYY")} (
                    {mediaDetails.releases.countries[0].iso_3166_1})<i className="bi bi-dot"></i>
                  </>
                )}
                {mediaDetails.runtime > 0 && (
                  <>
                    {convertToHours(mediaDetails.runtime)}
                    <i className="bi bi-dot"></i>
                  </>
                )}
                {languages[mediaDetails.original_language]}
              </p>
              <p className="d-flex align-items-center justify-content-center gap-1 flex-wrap">
                <Rating vote_average={mediaDetails.vote_average} />
                {genres}
              </p>
              {watchProviders.length > 0 && (
                <p className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
                  {watchProviders.map((item, idx) => (
                    <Figure.Image
                      style={{ width: "3rem" }}
                      className={styles.figureImg}
                      src={`https://image.tmdb.org/t/p/w300/${item.logo_path}`}
                      key={idx.toString()}
                    />
                  ))}
                </p>
              )}
            </div>
          </Col>
          <Col md={9}>
            {activeVideo && (
              <>
                {videosList && videosList.length > 1 && (
                  <div className="mb-3">
                    <ButtonGroup aria-label="Basic example">
                      {videosList.map((item) => (
                        <Button
                          variant={item.id === activeVideo.id ? "primary" : "light"}
                          key={item.id}
                          onClick={() => setActiveVideo(item)}
                        >
                          {item.type}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </div>
                )}
                <Link
                  to={`/video/${activeVideo.id}`}
                  state={{ background: location, trailerVideo: activeVideo as VideoResults }}
                >
                  <div className={styles.fluidMedia}>
                    <div
                      style={{ backgroundImage: `url(https://i.ytimg.com/vi/${activeVideo.key}/maxresdefault.jpg)` }}
                    ></div>
                  </div>
                </Link>
              </>
            )}
            <div className="mt-5 mb-5">
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
                  <Col className="flex-grow-0" key={`${idx}_${item.id}`}>
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
            {mediaDetails.recommendations.results.length > 0 && (
              <>
                <h5>Recommendations</h5>
                <div className={"mb-5 " + styles.listRowContainer}>
                  {mediaDetails.recommendations.results.map((item, idx) => (
                    <Col key={`${idx}_${item.id}`}>
                      <Link to={`/movie/${item.id}`}>
                        <Card bsPrefix={styles.card + " card"} text="light">
                          <Card.Img
                            className={styles.cardImg}
                            variant="top"
                            src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`}
                          />
                          <Card.Body bsPrefix={"card-img-overlay " + styles.imgOverlay}>
                            <div className="h5">{item.title}</div>
                            <div>
                              <Rating vote_average={item.vote_average} />
                              {` `}
                              {languages[item.original_language]}
                            </div>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  ))}
                </div>
              </>
            )}
            <div className="mb-4 "></div>
          </Col>
        </Row>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Details;
