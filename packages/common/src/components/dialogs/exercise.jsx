import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form, Row, Col, Badge } from "react-bootstrap";
import ReactAudioPlayer from "react-audio-player";
import { EXERCICES_TITLES_OBJECT } from "common/src/constants";
import { useHistory } from "react-router";
export default function Exercises({
  show,
  handleClose,
  data,
  setData,
  list,
  isDisabled,
}) {
  const [modifiedData, setModifiedData] = React.useState([]);
  const [isEdit, setIsEdit] = React.useState(false);
  const [note, setNote] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    if (list && show) {
      const res =
        {
          1: list.questions,
          2: list.questions,
          3: list.questions,
          4: list.questions,
          5: list.notes,
          6: list.text,
          7: list.questions,
          8: list.phrases,
          9: list.phrases,
          10: list.notes,
          11: list.notes,
          12: list.questions,
          13: list.questions,
        }[list.id] || [];

      setModifiedData(res);
      if (list.id === 5 || list.id === 10 || list.id === 11) {
        setSelected(list.selected || "");
        setNote(list.note || list.notes[list.selected] || "");
        if (list.selected === -1) {
          setIsEdit(true);
        } else {
          setIsEdit(false);
        }
      } else {
        setIsEdit(false);
      }
    }
  }, [data, list]);

  const handleChangeData = (e, item) => {
    const temp = JSON.parse(JSON.stringify(modifiedData));
    if (e.target.checked) {
      temp.push(item);

      setModifiedData(temp);
    } else {
      const res = temp.filter((val) => val.id !== item.id);

      setModifiedData(res);
    }
  };
  const handleChange = (e) => {
    const val = JSON.parse(e.target.value);
    if (val.value === -1) {
      setIsEdit(true);
      setSelected(-1);
      setNote("");
    } else {
      setSelected(val.value);
      setNote(val.label);
      setIsEdit(false);
    }
  };
  const Exercise = (id) => {
    return (
      {
        0: <></>,
        1: <Exercise1 />,
        2: <Exercise1 />,
        3: <Exercise3 />,
        4: <Exercise4 />,
        5: <Exercise5 />,
        6: <></>,
        7: <Exercise7 />,
        8: <></>,
        9: <></>,
        10: <Exercise5 />,
        11: <Exercise5 />,
        12: <Exercise1 />,
        13: <Exercise1 />,
        14: <></>,
      }[id] || <>No exercise found</>
    );
  };
  const Exercise1 = () => {
    return data?.questions.map((item, i) => {
      return (
        <>
          <div className="align-items-start flex-nowrap fw-600 lh mb-3 row text-dark text-default">
            {isDisabled !== true && (
              <Form.Check
                inline
                name="card"
                type={"checkbox"}
                checked={modifiedData?.filter((val) => val.id == item.id)[0]}
                className="custom-checkbox mt-1"
                onChange={(e) => handleChangeData(e, item)}
              />
            )}

            <span className="d-block text-left">
              {" "}
              {i + 1}. {item.paragraph}
            </span>
          </div>
          <div className=" row mt-3 space-between">
            {data.id === 2 && (
              <div className="px-4 py-2 mb-2 border border-success rounded">
                Right Answer is{" "}
                <span className="text-dark fw-600">{item?.rightAnswer}</span>
              </div>
            )}
            {item?.answers?.map((val, i) => (
              <div className="col text-grey fw-400 text-default mb-3">
                {data.id === 1 &&
                  (item?.rightAnswer === i ? (
                    <div className="px-1 py-1 mb-2 border border-success rounded">
                      {val}
                    </div>
                  ) : (
                    <div className="px-1 py-1 mb-2 border border-danger rounded">
                      {val}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </>
      );
    });
  };
  const Exercise3 = () => {
    return data?.questions.map((item, i) => {
      return (
        <li className="text-dark fw-600 text-default mb-4 list-unstyled">
          <div className="d-flex align-items-center mb-3">
            {isDisabled !== true && (
              <Form.Check
                inline
                name="card"
                type={"checkbox"}
                checked={modifiedData?.filter((val) => val.id == item.id)[0]}
                className="custom-checkbox"
                onChange={(e) => handleChangeData(e, item)}
              />
            )}
            <ReactAudioPlayer src={item.url} controls className="mx-auto" />
          </div>

          <span className="d-block">
            {" "}
            {i + 1}. {item.paragraph}
          </span>
          <div className="mt-3">
            {item?.answers?.map((val, i) => (
              <div className="col text-grey fw-400 text-default mb-3">
                {data.id === 3 &&
                  (item?.rightAnswer === i ? (
                    <div className="px-1 py-1 mb-2 border border-success rounded">
                      {val}
                    </div>
                  ) : (
                    <div className="px-1 py-1 mb-2 border border-danger rounded">
                      {val}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </li>
      );
    });
  };
  const Exercise4 = () => {
    return data?.questions.map((item, i) => {
      return (
        <li className="text-dark fw-600 text-default mb-3 list-unstyled">
          <ReactAudioPlayer src={item.url} controls />
          <span className="d-flex align-items-start">
            {isDisabled !== true && (
              <Form.Check
                inline
                name="card"
                type={"checkbox"}
                checked={modifiedData?.filter((val) => val.id == item.id)[0]}
                className="custom-checkbox"
                onChange={(e) => handleChangeData(e, item)}
              />
            )}{" "}
            {i + 1}. {item.paragraph}
          </span>
          <div className="mt-3">
            {data.id === 4 && (
              <>
                {item?.rightAnswer == true ? (
                  <div className="px-1 py-1 mb-2 border border-success rounded">
                    True
                  </div>
                ) : (
                  <div className="px-1 py-1 mb-2 border border-danger rounded">
                    True
                  </div>
                )}{" "}
                {item?.rightAnswer == false ? (
                  <div className="px-1 py-1 mb-2 border border-success rounded">
                    {"False"}
                  </div>
                ) : (
                  <div className="px-1 py-1 mb-2 border border-danger rounded">
                    {"False"}
                  </div>
                )}
              </>
            )}
          </div>
        </li>
      );
    });
  };

  const Exercise5 = () => {
    return (
      <div className="row">
        <div className="col-sm-12 fw-600 px-0 text-dark font-sm text-left">
          Notes
        </div>
        <select
          aria-label="Default select example"
          className="form-control"
          disabled={isDisabled}
          defaultValue={data.selected}
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <option
            selected
            value={JSON.stringify({ value: selected, label: note })}
          >
            {selected === -1 ? "N/A" : note}
          </option>
          {data?.notes?.map((item, i) => {
            return i !== selected ? (
              <option value={JSON.stringify({ value: i, label: item })}>
                {item}
              </option>
            ) : (
              <></>
            );
          })}
          {selected !== -1 && (
            <option value={JSON.stringify({ value: -1, label: "N/A" })}>
              N/A
            </option>
          )}
        </select>
      </div>
    );
  };

  const Exercise7 = () => {
    return data?.questions.map((item, i) => {
      return (
        // <li>
        //   <div className="row">
        //     <div className="col-sm-4 row space-between">
        //       {isDisabled !== true && (
        //         <Form.Check
        //           inline
        //           name="card"
        //           type={"checkbox"}
        //           checked={modifiedData?.filter((val) => val.id == item.id)[0]}
        //           className="custom-checkbox"
        //           onChange={(e) => handleChangeData(e, item)}
        //         />
        //       )}
        //       <span className="d-block"> {item.id + 1}</span>
        <li className="list-unstyled">
          <div className="row border-bottom pb-4 mb-4">
            <div className="row">
              <span className="d-block h6 text-black fw-600 mr-3">
                {" "}
                {i + 1}
              </span>
              {isDisabled !== true && (
                <Form.Check
                  inline
                  name="card"
                  type={"checkbox"}
                  checked={modifiedData?.filter((val) => val.id == item.id)[0]}
                  className="custom-checkbox align-items-start"
                  onChange={(e) => handleChangeData(e, item)}
                />
              )}
              <img
                src={item.url}
                alt=""
                className="rounded"
                style={{ height: "100px", width: "100px" }}
              />
            </div>
            <div className="col-sm-8">
              {item?.answers?.map((val, i) => (
                <div className="col text-grey fw-400 text-default mb-3">
                  {data.id === 7 &&
                    (item?.rightAnswer === i ? (
                      <div className="px-1 py-1 mb-2 border border-success">
                        {val}
                      </div>
                    ) : (
                      <div className="px-1 py-1 mb-2 border border-danger">
                        {val}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </li>
      );
    });
  };

  const handleDialogClose = () => {
    if (isDisabled) {
      setSelected("");
      setNote("");
      setIsEdit(false);
      handleClose();
      return false;
    }
    const res =
      {
        1: { id: data.id, questions: modifiedData },
        2: { id: data.id, questions: modifiedData },
        3: { id: data.id, questions: modifiedData },
        4: { id: data.id, questions: modifiedData },
        5: {
          note: note || (data?.notes && data?.notes[data?.selected]) || "",
          id: data.id,
          selected:
            note && selected === -1
              ? -1
              : selected !== -1
              ? selected
              : data?.selected,
        },
        6: data.text,
        7: { id: data.id, questions: modifiedData },
        8: data.phrases,
        9: data.phrases,
        10: {
          note: note || (data?.notes && data?.notes[data?.selected]) || "",
          id: data.id,
          selected:
            note && selected === -1
              ? -1
              : selected !== -1
              ? selected
              : data?.selected,
        },
        11: {
          note: note || (data?.notes && data?.notes[data?.selected]) || "",
          id: data.id,
          selected:
            note && selected === -1
              ? -1
              : selected !== -1
              ? selected
              : data?.selected,
        },
        12: { id: data.id, questions: modifiedData },
        13: { id: data.id, questions: modifiedData },
      }[data.id] || [];

    if (!isDisabled) {
      setData(res);
    }

    setSelected("");
    setNote("");
    setIsEdit(false);
    handleClose(res);
  };
  return (
    <div>
      <Modal
        show={show}
        className="class-modal "
        centered
        onHide={handleDialogClose}
      >
        {
          <Modal.Body>
            <div>
              <div className="text-center text-black h5 fw-600 mb-4">
                {EXERCICES_TITLES_OBJECT[data?.id]}
              </div>
              <div className="text-center">{Exercise(data?.id)}</div>
              {isEdit && (
                <input
                  type="text"
                  className="form-control mb-2 mt-3"
                  placeholder={"Notes"}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  value={note}
                  disabled={isDisabled}
                />
              )}
            </div>
          </Modal.Body>
        }
      </Modal>
    </div>
  );
}
