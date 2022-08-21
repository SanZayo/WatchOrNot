import { Card, Col, Container, Row } from "react-bootstrap";
import useMovies, { Movies } from "../../Hooks/useMovies";

import styles from "./index.module.scss";

function HorizontalList(props: any) {
  const list: Movies[] = useMovies("movie/" + props.name, 20);

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
            <Card bsPrefix={"card " + styles.card} border="dark" text="light">
              <Card.Img variant="top" width={200} src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
              <Card.Body bsPrefix="card-img-overlay imgOverlay">
                <Card.Text>{item.title}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HorizontalList;
