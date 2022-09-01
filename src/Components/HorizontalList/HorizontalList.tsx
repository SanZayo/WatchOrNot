import { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import Rating from "../Rating";
import { AppContext } from "../../Contexts/AppContext";

import styles from "./HorizontalList.module.scss";
import { IContentsList } from "../../API/getAllContents";

export interface IHorizontalListProps {
  displayName: string;
  data: IContentsList[];
  type?: "backdrop" | "poster";
}

function HorizontalList({ displayName, data, type = "poster" }: IHorizontalListProps) {
  const {
    state: { activeMediaType, languages },
  } = useContext(AppContext);
  const allLanguages = languages.allLanguages;

  if (data.length === 0) {
    return null;
  }

  return (
    <>
      <Row>
        <Col>
          <h4 className="mt-4"> {displayName} </h4>
        </Col>
      </Row>
      <Row bsPrefix={"mb-4 " + styles.listRow}>
        <div className={`${styles[type]} ${styles.listRowContainer}`}>
          {data.map((item, idx) => (
            <Col key={`${idx}_${item.id}`} className="flex-grow-0">
              <Link to={`/${activeMediaType}/${item.id}`}>
                <Card bsPrefix={styles.card + " card"} text="light">
                  <Card.Img
                    className={styles.cardImg}
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w300${type === "poster" ? item.poster_path : item.backdrop_path}`}
                    loading="lazy"
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
