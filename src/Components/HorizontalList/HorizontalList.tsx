import { Card, Col, Row } from "react-bootstrap";
import useMediaType, { MediaType } from "../../Hooks/useMediaType";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import useLanguages from "../../Hooks/useLanguages";

import styles from "./HorizontalList.module.scss";

function HorizontalList(props: any) {
  const list: MediaType[] = useMediaType("movie/" + props.name, 20);
  const languages = useLanguages();

  return (
    <>
      <Row>
        <Col>
          <h4 className="mt-4"> {props.displayName} </h4>
        </Col>
      </Row>
      <Row bsPrefix={"mb-4 " + styles.listRow}>
        <div className={styles.listRowContainer}>
          {list.map((item, idx) => (
            <Col key={`${idx}_${item.id}`}>
              <Link to={`/movie/${item.id}`}>
                <Card bsPrefix={styles.card + " card"} text="light">
                  <Card.Img
                    className={styles.cardImg}
                    variant="top"
                    width={200}
                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
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
          <Col className="p-3"></Col>
        </div>
      </Row>
    </>
  );
}

export default HorizontalList;
