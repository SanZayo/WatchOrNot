import { Dispatch, SetStateAction } from "react";
import Modal from "react-bootstrap/Modal";
import { Result } from "../../Hooks/useMediaTypeDetails";

import styles from "./Trailer.module.scss";

type TrailerProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  activeVideo: Result;
};

function Trailer({ show, setShow, activeVideo }: TrailerProps) {
  return (
    <Modal show={show} onHide={() => setShow(false)} size="xl" fullscreen="md-down" bg="black">
      <Modal.Header closeButton>
        <Modal.Title>{activeVideo?.type}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.fluidMedia}>
        <iframe
          src={"https://www.youtube.com/embed/" + activeVideo?.key}
          title={activeVideo?.name}
          className="embed hide"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal.Body>
    </Modal>
  );
}

export default Trailer;
