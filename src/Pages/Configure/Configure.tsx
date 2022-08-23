import { Dispatch, SetStateAction } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

import styles from "./Configure.module.scss";

type Props = {};

function Configure({}: Props) {
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <Modal show={true} onHide={() => closeModal()} size="xl" fullscreen="md-down">
      <Modal.Header className={styles.modalTitle} closeButton closeVariant="white">
        <Modal.Title>Configure</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.fluidMedia}></Modal.Body>
    </Modal>
  );
}

export default Configure;
