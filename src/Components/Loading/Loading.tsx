import { Spinner } from "react-bootstrap";

type LoadingProps = {
  text?: string;
};

function Loading({ text = "Loading..." }: LoadingProps) {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 w100">
      <Spinner animation="border" role="status" variant="light">
        <span className="visually-hidden">{text}</span>
      </Spinner>
    </div>
  );
}

export default Loading;
