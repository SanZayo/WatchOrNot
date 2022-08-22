import { Card, Col, Row } from "react-bootstrap";
import useMediaType, { MediaType } from "../../Hooks/useMediaType";

import styles from "./index.module.scss";
import { Link } from "react-router-dom";

function HorizontalList(props: any) {
  const list: MediaType[] = useMediaType("movie/" + props.name, 20);

  return (
    <>
      <Row>
        <Col>
          <h3 className="mt-4"> {props.displayName} </h3>
        </Col>
      </Row>
      <Row bsPrefix={"mb-4 " + styles.listRow}>
        {list.map((item, idx) => (
          <Col key={`${idx}_${item.id}`}>
            <Link to={`/movie/${item.id}`}>
              <Card bsPrefix={"card " + styles.card} border="dark" text="light">
                <Card.Img variant="top" width={200} src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
                <Card.Body bsPrefix="card-img-overlay imgOverlay">
                  <Card.Text>{item.title}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HorizontalList;
