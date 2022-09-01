import { useState, useEffect, useContext } from "react";
import { Button, ButtonGroup, Card, Col, Figure, Row } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import map from "lodash/map";
import find from "lodash/find";
import uniqBy from "lodash/uniqBy";
import moment from "moment";

import Rating from "../../Components/Rating";
import Loading from "../../Components/Loading";
import HorizontalList from "../../Components/HorizontalList";
import { AppContext } from "../../Contexts/AppContext";
import getContentById, {
  IFlatrate,
  IGetContentByIdArgs,
  IMediaTypeDetails,
  IVideoResults,
} from "../../API/getContentById";
import { convertToHours } from "../../Utils";

import styles from "./Details.module.scss";

type DetailsProp = {
  type: string;
};

function Details({ type }: DetailsProp) {
  const location = useLocation();
  const [videosList, setVideosList] = useState<IVideoResults[]>();
  const [activeVideo, setActiveVideo] = useState<IVideoResults>();
  let { typeId } = useParams();
  const {
    state: { activeMediaType, languages, activeLanguages },
  } = useContext(AppContext);
  const allLanguages = languages.allLanguages;

  const args: IGetContentByIdArgs = {
    endpoint: `${type}/${typeId}`,
    filter: "&append_to_response=videos,images,releases,watch/providers,recommendations,translations",
    activeLanguages,
  };

  const { isLoading, isError, data, error } = useQuery<IMediaTypeDetails>([activeMediaType, Object.values(args)], () =>
    getContentById(args)
  );

  const { mediaDetails, cast }: IMediaTypeDetails = data || ({} as IMediaTypeDetails);

  useEffect(() => {
    if (mediaDetails && Object.keys(mediaDetails).length > 0) {
      const list = mediaDetails.videos.results.filter((video) => video.site === "YouTube");
      setVideosList(list);
      setActiveVideo(list[0]);
    }
  }, [mediaDetails]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type, typeId]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <>Something went wrong! {error}</>;
  }

  const mediaDetailsLength = (mediaDetails && Object.keys(mediaDetails).length) || 0;

  const genres: string = mediaDetailsLength > 0 ? map(mediaDetails.genres, "name").join(", ") : "";
  const languageSpoken = mediaDetailsLength > 0 ? map(mediaDetails.spoken_languages, "english_name").join(", ") : "";

  const certificate =
    mediaDetailsLength > 0 && type !== "tv" ? find(mediaDetails.releases.countries, ["iso_3166_1", "IN"]) : "";

  let watchProviders: IFlatrate[] = [];
  if (mediaDetailsLength > 0 && mediaDetails["watch/providers"].results.IN) {
    const types = mediaDetails["watch/providers"].results.IN as any;
    const watchTypes: IFlatrate[] = [];
    Object.keys(types).forEach((item: string) => {
      if (Array.isArray(types[item])) {
        watchTypes.push(...types[item]);
      }
    });
    watchProviders = uniqBy(watchTypes, "provider_id");
  }

  return (
    <>
      {mediaDetailsLength > 0 ? (
        <Row>
          <Col md={3}>
            <div className={styles.mediaDetails}>
              <Figure.Image
                className={styles.figureImg}
                src={`https://image.tmdb.org/t/p/w300/${mediaDetails.poster_path}`}
              />
              <h3>
                {mediaDetails.title} {` `}{" "}
                {mediaDetails.release_date && `(${mediaDetails.release_date?.split("-")[0]})`}
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
                {allLanguages && allLanguages[mediaDetails.original_language]}
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
            {activeVideo ? (
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
                  state={{ background: location, trailerVideo: activeVideo as IVideoResults }}
                >
                  <div className={styles.fluidMedia}>
                    <div
                      style={{ backgroundImage: `url(https://i.ytimg.com/vi/${activeVideo.key}/maxresdefault.jpg)` }}
                    >
                      <div className={styles.playIconWrapper}>
                        <i className="bi bi-play-fill"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              <Figure className={styles.figure}>
                <div className={styles.carouselFigure}></div>
                <Figure.Image
                  className="d-block w-100"
                  src={`https://image.tmdb.org/t/p/original${mediaDetails.backdrop_path}`}
                />
              </Figure>
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
            <HorizontalList displayName="Recommendations" data={mediaDetails.recommendations.results} type="backdrop" />
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
