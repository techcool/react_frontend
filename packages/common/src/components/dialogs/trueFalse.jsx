import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ReactAudioPlayer from "react-audio-player";

export default function TrueFalse({ show, handleClose, data }) {
  const [questionData, setQuestionData] = React.useState([]);
  React.useEffect(() => {
    if (data) {
      const res = data.filter((item) => item.id === 4);
      setQuestionData(res[0]?.questions);
    }
  }, [data]);
  if (!data) return <> </>;

  return (
    <div>
      <Modal show={show} className="class-modal" centered onHide={handleClose}>
        {
          <Modal.Body>
            <div>
              <h2 className="content-h2 border-bottom pb-3">True or False</h2>
              <div>
                <ul className="list-unstyled">
                  {questionData?.map((item) => {
                    return (
                      <li className="text-dark fw-600 text-default mb-3">
                        <ReactAudioPlayer src={item.url} controls />
                        <span className="d-block">
                          {" "}
                          {item.id + 1}. {item.paragraph}
                        </span>
                        <div className="mt-3">
                          <Form.Check
                            inline
                            label="Yes"
                            checked={item.rightAnswer}
                            name={"check" + item.id}
                            type={"radio"}
                            className="custom-radio"
                          />
                          <Form.Check
                            inline
                            label="No"
                            checked={!item.rightAnswer}
                            name={"check" + item.id}
                            type={"radio"}
                            className="custom-radio"
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="btn-wrapper flex-column pt-0 mt-4">
                <Button
                  className="primary-btn mb-3 w-100"
                  variant="secondary"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </div>
          </Modal.Body>
        }
      </Modal>
    </div>
  );
}
