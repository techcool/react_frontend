import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import Pronunciation from "common/src/components/shared/pronunciation";

export default function Vocabulary({ show, handleClose, vocabulary, view }) {
  if (view) return <InnerVocabularyHtml vocabulary={vocabulary} />;
  return (
    <div>
      <Modal
        size="lg"
        show={show}
        className="class-modal wd-100"
        centered
        onHide={handleClose}
      >
        {
          <Modal.Body>
            <InnerVocabularyHtml vocabulary={vocabulary} />
          </Modal.Body>
        }
      </Modal>
    </div>
  );
}

export const InnerVocabularyHtml = ({ vocabulary }) => {
  const [open, setOpen] = React.useState(-1);

  return (
    <div>
      <div>
        <Row>
          {vocabulary &&
            vocabulary.map((item, index) => {
              return (
                <Col md={4}>
                  <div className="p-3 border speaker-item">
                    <h4
                      className="flex-grow-1 pl-0 col-9 text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        index === open ? setOpen(-1) : setOpen(index);
                      }}
                    >
                      {item.word}
                    </h4>

                    <Pronunciation word={item.word} language={"es"} />
                    {open === index && (
                      <label className="text-grey w-100">
                        {item.definition}
                      </label>
                    )}
                  </div>
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
};
