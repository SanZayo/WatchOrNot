import { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import Rating from "../Rating";
import useMedia, { MediaType } from "../../Hooks/useMedia";
import { AppContext } from "../../Contexts/AppContext";

import styles from "./HorizontalList.module.scss";

function HorizontalList(props: any) {
  const {
    state: { activeMediaType, languages },
  } = useContext(AppContext);
  const allLanguages = languages.allLanguages;
  const list: MediaType[] = useMedia(`${activeMediaType}/${props.name}`, 20);

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
            <Col key={`${idx}_${item.id}`} className="flex-grow-0">
              <Link to={`/${activeMediaType}/${item.id}`}>
                <Card bsPrefix={styles.card + " card"} text="light">
                  <Card.Img
                    className={styles.cardImg}
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  />
                  <Card.Body bsPrefix={"card-img-overlay " + styles.imgOverlay}>
                    <div className="h5">{item.title}</div>
                    <div>
                      <Rating vote_average={item.vote_average} />
                      {` `}
                      {allLanguages && allLanguages[item.original_language]}
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
