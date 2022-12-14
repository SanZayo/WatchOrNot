import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { IVideoResults } from "../../API/getContentById";

import styles from "./Trailer.module.scss";

type TrailerProps = {
  video: IVideoResults;
};

function Trailer({ video }: TrailerProps) {
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <Modal show={true} onHide={() => closeModal()} size="xl" fullscreen="md-down" centered>
      <Modal.Header className={styles.modalTitle} closeButton closeVariant="white">
        <Modal.Title>{video?.type}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.fluidMedia}>
        <iframe
          src={`https://www.youtube.com/embed/${video?.key}?&autoplay=1`}
          title={video?.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal.Body>
    </Modal>
  );
}

export default Trailer;
