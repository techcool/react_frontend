import React, { Fragment, useState, useEffect } from "react";
import moment from "moment";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Accordion, useAccordionToggle, Button } from "react-bootstrap";
import styledComponents from "styled-components";
import renderHTML from "react-render-html";
import closeModal from "common/src/components/helpers/closeModal";
import VideoPlayer from "common/src/components/videoPlayer/videoPlayer";
import Pronunciation from "../pronunciation";
import classnames from "classnames";
import { confirmAlert } from "react-confirm-alert";
import ReactDatePicker from "react-datepicker";
import DeleteDialog from "common/src/components/dialogs/deleteDialog";
import { InnerVocabularyHtml } from "common/src/components/dialogs/vocabulary";
import { setRedux } from "common/src/old-api/usersActions";
import arw_down from "common/src/images/arw_down_blue.svg";
import caledar_icon from "common/src/images/calendar_black.svg";
import edit_pencil from "common/src/images/edit_pencil.svg";
import del_icon from "common/src/images/del_icon.svg";
import novice from "common/src/images/novice.svg";
import {
  fetchVideoDetails,
  updateVideoNotes,
  deleteVideoNotes,
} from "common/src/old-api/videosActions";
import notes_icon from "common/src/images/notes_icon";
import vocab_icon from "common/src/images/vocab_icon";
import video_icon from "common/src/images/video_icon";
import grammar_icon from "common/src/images/grammar_icon";
import { RenderForTeachersOnly } from "../ShouldRender";

const VideoScreenWithButtons = ({
  url,
  t,
  highlight,
  grammar = "",
  vocabulary = [],
  video_id,
  level,
  category,
  title,
  description,
  notes = "",
  saveNotes = () => { },
  language,
  deleteVocabulary = () => { },
  labels = [],
  components = [],
  links = [],
  captionUrl = null,
  videoHeight = "100%",
  videoMinHeight = "400px",
  hideTabs = false,
  buttons = [],
  close,
  handleCloseD,
  hideNotes,
  status,
  handleEvents,
  hide,
  showCategory = true,
  showVideoTitleAndDescription = true,
  assignButton = true
}) => {
  const [initialText, setInitialText] = useState(notes);
  const [text, setText] = useState("");
  const [isHide, setHide] = useState(false);
  const { show } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  // if (initialText !== notes) {
  //   setInitialText(notes)
  //   setText(notes)
  // }
  // React.useEffect(() => {
  //   if (hide) {
  //     if (!show) {
  //       setHide(true);
  //       (async () => {
  //         await dispatch(setRedux({ show: true }));
  //       })();
  //     } else {
  //       setHide(false);
  //     }
  //   }
  // }, []);
  // const adjustHide = () => {
  //   const tempHide = isHide;
  //   hide && setHide(!isHide);
  //   if (!tempHide) {
  //     (async () => {
  //       await dispatch(setRedux({ show: false }));
  //     })();
  //   }
  // };
  const assignButtonClick = () => {
    history.push('/teacher/create-assignment?videoId='+video_id)
  }
  return (
    <div className={hide ? "w-100 px-2" : "w-100"}>
      {/* {hide && (
        <div className="col-lg-12" style={{display:'inline-block'}}>
        <Button className="primary-btn primary-btn-outline px-5 m-4" onClick={() => adjustHide()} style={{float:'right'}}>{isHide ? "Show Video" : "Hide Video"}</Button></div>
      )} */}

      {!hide && (
        <>
          <div className="d-flex justify-content-between bg-white w-100">
            <div
              className={classnames("nav nav-pills screen-btns mb-3", {
                "d-none": hideTabs,
              })}
              style={{ fontSize: "13px" }}
              role="tablist"
            >
              <a
                className="nav-link active text-dark"
                data-toggle="pill"
                href="#video-selected"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                <span className="pr-2">{video_icon}</span>
                Video
              </a>
              <a
                className="nav-link text-dark ml-1"
                data-toggle="pill"
                href="#grammar-bank"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
              >
                <span className="pr-2">{grammar_icon}</span>
                Grammar Bank
              </a>
              <a
                className="nav-link text-dark  ml-1"
                data-toggle="pill"
                href="#vocabulary-bank"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
              >
                <span className="pr-2">{vocab_icon} </span>
                Vocabulary Bank
              </a>
              <a
                className="nav-link text-dark ml-1"
                data-toggle="pill"
                href="#video-notes"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
              >
                <span className="pr-2">{notes_icon}</span>
                  Notes
              </a>


              {labels.map((label, index) => (
                <a
                  key={label}
                  className="nav-link text-dark ml-1"
                  data-toggle="pill"
                  href={`#tab-${index}`}
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  {label}
                </a>
              ))}
              {links.map((link) => {
                if (status)
                  return (
                    <span
                      key={link}
                      className="nav-link text-dark ml-1"
                      style={{ cursor: "pointer" }}
                      // to={link.href}
                      onClick={() => (close ? handleCloseD() : closeModal())}
                    >
                      {link.title}
                    </span>
                  );
                return (
                  <Link
                    key={link}
                    className="nav-link text-dark ml-1"
                    to={link.href}
                    onClick={() =>
                      close
                        ? handleCloseD() && status && handleEvents
                        : closeModal()
                    }
                  >
                    {link.title}
                  </Link>
                );
              })}
              {assignButton && 
              <RenderForTeachersOnly>
                <button
                  className="ml-3 primary-btn btn primary-btn-outline"
                  type="button"
                  onClick={() => assignButtonClick()}
                >
                  Assign
                </button>
              </RenderForTeachersOnly>
              }
            </div>
          </div>
          <div
            className="tab-content bg-grey p-4 w-100"
            id="v-pills-tabContent"
          >
            <div
              className="tab-pane fade show active"
              style={{ minHeight: "100px", height: "100%" }}
              id="video-selected"
            >
              {/* <div
            id="video-container"
            className="w-100 h-100 d-flex"
            style={{ minHeight: videoMinHeight, height: videoHeight }}
            > 
            */}

              <>
                <div className="br-12 overflow-hidden">
                  {hideNotes ? (
                    <video height={videoHeight} controls controlsList="nodownload" disablePictureInPicture>
                      <source src={url} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <VideoPlayer
                      t={t}
                      url={url}
                      highlight={highlight}
                      captionUrl={captionUrl}
                      videoHeight={videoHeight}
                      videoMinHeight={videoMinHeight}
                    />
                  )}
                </div>
                {
                  showCategory &&
                  <div className="mt-4">
                    {category &&
                      <span className="category-badge mr-3">{category}</span>
                    }
                    {level &&
                      level.map((item, index) => {
                        return (
                          <React.Fragment>
                            {item.toLowerCase().indexOf("high") > -1 && (
                              <img
                                src={novice}
                                className="pr-2"
                                height="20px"
                                alt=""
                              />
                            )}
                            <span key={index} className="category-badge mr-3">
                              {item}
                            </span>
                          </React.Fragment>
                        );
                      })}
                  </div>
                }
                {showVideoTitleAndDescription &&
                  <div className="my-3">
                    {title && (
                      <h2 className="h4 fw-600 text-black mb-3">{title}</h2>
                    )}
                    {description && <p>{description}</p>}
                  </div>
                }
                {buttons.map((Button) => (
                  <Button />
                ))}
              </>
            </div>
            <div className="tab-pane markdown-preview fade" id="grammar-bank">
              {renderHTML(grammar)}
            </div>
            <div
              className="tab-pane fade vocab-white"
              id="vocabulary-bank"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <InnerVocabularyHtml vocabulary={vocabulary} />
              {/* <Vocabulary
            {...{ vocabulary, deleteVocabulary, language }}
             /> */}
            </div>
            <div
              className="tab-pane fade h-100"
              id="video-notes"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <NoteEditor {...{ text, saveNotes, setText, notes, video_id }} />
            </div>
            {components.map((component, index) => (
              <div
                key={`tab-${index}`}
                className="tab-pane fade"
                id={`tab-${index}`}
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                {component}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const Vocabulary = ({ vocabulary, deleteVocabulary, language }) => {
  const [opened, setOpened] = useState(-1);
  const rows = [];
  for (let i = 0; i < vocabulary.length; i++) {
    if (i % 4 === 0) rows.push([]);
    const row = rows[rows.length - 1];
    const vocabularyElement = vocabulary[i];
    row.push(vocabularyElement);
  }
  return rows.map((row, index) => (
    <RenderRow
      key={index}
      rowIndex={index}
      row={row}
      setOpened={() => setOpened(index)}
      close={() => setOpened(-1)}
      isOpened={opened === index}
      language={language}
      deleteVocabulary={deleteVocabulary}
    />
  ));
};

const Row = styledComponents.div`
  padding-top : 20px;
  padding-bottom: 20px;
  -webkit-touch-callout: none;
  -webkit-user-select: none; 
   -khtml-user-select: none; 
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;

`;
const DefintionBox = styledComponents.div`
  color:  black;
`;
const Word = styledComponents.span`
  &.selected{
    border-bottom: 1px solid black;
  }
  &:hover{
    cursor:pointer;
  }
`;

const RenderRow = ({
  rowIndex,
  row,
  setOpened,
  isOpened,
  close,
  language,
  deleteVocabulary,
}) => {
  const [select, setSelected] = useState(0);
  return (
    <>
      <div className={classnames("row")}>
        {row.map((item, index) => (
          <Row
            className={classnames(
              "col-3",
              "border-right",
              { "border-top": rowIndex === 0 },
              { "border-left": index === 0 },
              { "border-bottom": !isOpened }
            )}
          >
            <Word
              className={classnames({ selected: isOpened && index === select })}
              onClick={() => {
                if (isOpened && select === index) {
                  close();
                } else {
                  setSelected(index);
                  setOpened();
                }
              }}
            >
              {item.word}
            </Word>
            {item._id !== undefined && (
              <input
                type="button"
                className="btn btn-danger"
                onClick={() =>
                  confirmAlert({
                    title: "Delete video",
                    message: "Are you sure that you want to remove the word?",
                    buttons: [
                      {
                        label: "Yes",
                        onClick: () => deleteVocabulary(item._id),
                      },
                      {
                        label: "No",
                        onClick: () => { },
                      },
                    ],
                  })
                }
                value="X"
              />
            )}
          </Row>
        ))}
      </div>
      {isOpened && (
        <DefintionBox
          className="row"
          style={{ marginTop: "0px", marginBottom: "0px" }}
        >
          {Array(4)
            .fill(0)
            .map((e, index) => (
              <div
                className={classnames(
                  "col-3",
                  "border-right",
                  "border-bottom",
                  { "border-left": index === 0 }
                )}
                style={{
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              >
                {index === select && (
                  <>
                    <div key={select}>
                      <Pronunciation
                        word={row[select].word}
                        language={language}
                      />
                    </div>
                    {row[select].definition}
                  </>
                )}
              </div>
            ))}
        </DefintionBox>
      )}
    </>
  );
};

const NoteEditor = ({ text, saveNotes, setText, notes, video_id }) => {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterNotes, setFilterNotes] = useState(notes);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [show, setShow] = useState(false);
  const { role, accessToken } = useSelector((state) => state.user);
  const [showNotes, setShowNotes] = useState(false);

  const videoDetailsForFilter = async (isReset = false) => {
    const response = await fetchVideoDetails({
      accessToken,
      role,
      video_id,
      isStats: false,
      params: isReset
        ? {
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
        }
        : {},
    });
    if (response) {
      setFilterNotes(response.notes);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      videoDetailsForFilter(true);
    }
  }, [startDate, endDate]);


  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    videoDetailsForFilter();
  };
  const onDelete = async (item) => {
    const res = await deleteVideoNotes({
      accessToken,
      role,
      video_id,
      notes_id: item._id,
    });
    if (res) {
      videoDetailsForFilter();
    }
    setShow(false);
    setCurrentId("");
  };
  const onEdit = (item) => {
    setText(item.notes);
    setIsEdit(true);
    setCurrentId(item._id);
  };
  const onUpdate = async () => {
    const res = await updateVideoNotes({
      accessToken,
      role,
      video_id,
      notes: text,
      notes_id: currentId,
    });
    if (res) {
      videoDetailsForFilter();
    }
    setCurrentId("");
  };

  const Capital = (string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  };

  return (
    <Fragment>
      <div className="d-inline-flex position-relative align-items-center mb-5 w-100">
        <button
          className="primary-btn btn primary-btn-outline"
          type="button"
          onClick={async () => {

            if (!showNotes) {
              await videoDetailsForFilter();
            }
            setShowNotes(!showNotes)
          }}
        >
          {!showNotes ? "Find Notes" : "Hide Notes"}
        </button>
      </div>
      <div className="border-bottom">
        {showNotes && (
          <React.Fragment>
            <div className="d-inline-flex position-relative align-items-center mb-5 mr-md-4">
              <span className="text-black pr-3">Starting Date</span>
              <ReactDatePicker
                className="react-custom-datepicker"
                selected={startDate}
                maxDate={endDate}
                onChange={(date) => setStartDate(date)}
              />
              <img src={caledar_icon} className="cal-icon" alt="" />
            </div>
            <div className="d-inline-flex position-relative align-items-center">
              <span className="text-black pr-3">Ending Date</span>
              <ReactDatePicker
                className="react-custom-datepicker"
                selected={endDate}
                minDate={startDate}
                onChange={(date) => setEndDate(date)}
              />
              <img src={caledar_icon} className="cal-icon" alt="" />
            </div>
          </React.Fragment>
        )}
        {showNotes && startDate && endDate && (
          <button
            className="primary-btn sm ml-2 d-inline-flex"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
      {showNotes && (
        <div>
          {filterNotes.length > 0 && (
            <Accordion
              defaultActiveKey="1"
              className="notes-scroller scroll-sm"
            >
              {filterNotes &&
                Array.isArray(filterNotes) &&
                filterNotes.map((item, i) => {
                  return (
                    <Card
                      className="border-0 mb-3 p-3 rounded bg-white"
                      key={`card-${i}`}
                    >
                      <CustomToggle eventKey={i === 0 ? i - 1 : i}>
                        <div className="pointer d-flex">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="pr-4">
                              {item.date
                                ? moment(item.date).format("DD MMM, YYYY")
                                : "-NA-"}
                            </span>
                            <span className="font-sm text-grey fw-500">
                              {Capital(item.notes.substring(0, 40))}
                              {item.notes.trim().length > 40 ? "..." : ""}
                            </span>
                          </div>
                          <div className="ml-auto">
                            <img
                              src={edit_pencil}
                              title="Edit"
                              alt="Edit"
                              className="ml-1"
                              height="16px"
                              onClick={() => {
                                onEdit(item);
                              }}
                            />
                            <img
                              src={del_icon}
                              title="Delete"
                              alt="Delete"
                              className="ml-1"
                              height="16px"
                              onClick={() => {
                                setCurrentId(item._id);
                                setShow(true);
                              }}
                            />

                            <img
                              src={arw_down}
                              className="select-arrow ml-3"
                              alt=""
                            />
                          </div>{" "}
                        </div>
                      </CustomToggle>
                      <Accordion.Collapse eventKey={i === 0 ? i - 1 : i}>
                        <div className="d-flex justify-content-between mt-3 align-items-center" style={{ whiteSpace: 'break-spaces' }}>
                          {item.notes.charAt(0).toUpperCase() +
                            item.notes.slice(1)}
                        </div>
                      </Accordion.Collapse>
                    </Card>
                  );
                })}
              {notes && !Array.isArray(notes) && notes.trim() != "" && (
                <Card className="border-0 mb-3 p-3" key={`card-0`}>
                  <CustomToggle eventKey="0">
                    <div className="pointer d-flex">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="pr-4">-NA-</span>
                        <span className="font-sm text-grey fw-500">
                          {Capital(notes.substring(0, 40))}
                          {notes.trim().length > 40 ? "..." : ""}
                        </span>
                      </div>
                      <div className="ml-auto">
                        <img
                          src={edit_pencil}
                          title="Edit"
                          alt="Edit"
                          className="ml-1"
                          height="16px"
                          onClick={() => {
                            onEdit({ _id: undefined, notes: notes });
                          }}
                        />

                        <img
                          src={del_icon}
                          title="Delete"
                          alt="Delete"
                          className="ml-1"
                          height="16px"
                          onClick={() => {
                            // onDelete({ _id: undefined, notes: notes });
                            setCurrentId(undefined);
                            setShow(true);
                          }}
                        />
                      </div>
                      <img src={arw_down} className="ml-auto" alt="" />
                    </div>
                  </CustomToggle>

                  <Accordion.Collapse eventKey="0">
                    <div className="d-flex justify-content-between mt-3 align-items-center">
                      {notes.charAt(0).toUpperCase() + notes.slice(1)}
                    </div>
                  </Accordion.Collapse>
                </Card>
              )}
            </Accordion>
          )}
        </div>
      )}

      <textarea
        style={{
          width: "100%",
          resize: "none",
          fontSize: "16px",
          "background-color": "#F5F5F5",
          height: "244px",
          padding: "10px",
          marginTop: "30px"
        }}
        className="border-0"
        rows="10"
        maxLength="500"
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Note Something here..."
      />
      <div className="d-flex flex-row-reverse">
        {isEdit && (
          <input
            type="button"
            className="btn button-blue "
            value={"Cancel"}
            onClick={() => {
              setText("");
              setIsEdit(false);
            }}
          />
        )}
        <input
          type="button"
          className="btn button-blue mt-2"
          value={isEdit ? "Update" : "Save"}
          disabled={text ? false : true}
          onClick={async () => {
            setText("");
            isEdit ? await onUpdate() : await saveNotes({ notes: text });
            setIsEdit(false);
            videoDetailsForFilter();
          }}
        />
      </div>
      <DeleteDialog
        name="Notes"
        isFrom="Student"
        show={show}
        handleClose={() => setShow(false)}
        handleDelete={() => onDelete({ _id: currentId, notes: text })}
      />
    </Fragment>
  );
};

const CustomToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <div onClick={decoratedOnClick}>
      {children}
    </div>
  );
};

export { VideoScreenWithButtons };
