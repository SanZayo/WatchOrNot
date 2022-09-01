import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { AppContext } from "../../Contexts/AppContext";

import styles from "./Configure.module.scss";
import { ILanguages } from "../../API/getAllLanguages";
// import { Dropdown, DropdownButton, InputGroup } from "react-bootstrap";

function Configure() {
  const allCheckedRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {
    state: { activeLanguages, languages },
    dispatch,
  } = useContext(AppContext);
  const { topLanguages }: ILanguages = languages;

  const [selected, setSelected] = useState<Record<string, string>>(activeLanguages);
  const [validated, setValidated] = useState<boolean>(true);

  const closeModal = () => {
    navigate(-1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lang = e.target.name;
    if (lang === "all") {
      setSelected(e.target.checked ? topLanguages : {});
    } else {
      setSelected((initailState) => {
        if (e.target.checked) {
          return { ...initailState, [lang]: topLanguages[lang] };
        } else {
          if (allCheckedRef.current && allCheckedRef.current.checked) {
            allCheckedRef.current.checked = false;
          }
          const items = { ...initailState };
          delete items[lang];
          return { ...items };
        }
      });
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(selected).length === 0) {
      setValidated(false);
    } else {
      dispatch({ activeLanguages: selected });
      closeModal();
    }
  };

  return (
    <Modal show={true} onHide={() => closeModal()} size="lg" fullscreen="md-down" centered>
      <Modal.Header className={styles.modalTitle} closeButton closeVariant="white">
        <Modal.Title>Choose Languages</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <Form onSubmit={handleSave}>
          <Form.Group as={Col} className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Select All / Unselect All"
              name="all"
              ref={allCheckedRef}
              onChange={handleChange}
              checked={Object.keys(selected).length === Object.keys(topLanguages).length ? true : false}
            />
          </Form.Group>
          <Row className="mb-3">
            {topLanguages &&
              Object.keys(topLanguages).map((item, idx) => (
                <Form.Group as={Col} className="mb-3" controlId="formBasicCheckbox" key={idx.toString()}>
                  <Form.Check
                    type="checkbox"
                    label={topLanguages[item]}
                    name={item}
                    onChange={handleChange}
                    checked={selected && Object.keys(selected).indexOf(item) > -1 ? true : false}
                  />
                </Form.Group>
              ))}
            {!validated && (
              <Form.Control.Feedback type="invalid" className="d-block">
                Please select any option
              </Form.Control.Feedback>
            )}
          </Row>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Configure;
