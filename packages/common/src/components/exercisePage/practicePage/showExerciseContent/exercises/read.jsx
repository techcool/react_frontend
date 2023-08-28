import React, { Fragment, useState } from "react";
import styled from "styled-components";
import speaker from "common/src/images/speaker.svg";
import sandtimer from "common/src/images/sandtimer.svg";
import CompleteActivityButton from "common/src/components/shared/completeActivityButton";
import { StickyContainer } from "common/src/components/shared/container";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const Span = styled.span`
  // color:#000;
  &.defined {
    &:hover {
      background-color: #ffff00;
    }
  }
`;
const Read = ({
  getCurrentQuestion,
  updateStudentAnswer,
  getPronunciation,
  getTranslation,
  addToVocabulary,
  getCurrentQuestionIndex,
  isCurrentExerciseCompleted,
  saveNotes,
  deleteVocabulary,
  getVideoDetails,
}) => {
  const text = getCurrentQuestion();
  const [word, setWord] = useState("");
  const [pronunciation, setPronunciation] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [isInVocabularyBank, setIsInVocabularyBank] = useState(false);
  const {
    url: Url,
    grammar,
    vocabulary,
    notes: Notes,
    captionUrl,
    language,
    _id: video_id,
    level,
    category,
    title,
    description,
  } = getVideoDetails();
  const { t } = getCurrentQuestion();
  const splittedText = splitText({
    text,
    vocabulary,
    setWord,
    setPronunciation,
    getPronunciation,
    setTranslation,
    getTranslation,
    setIsInVocabularyBank,
  });

  return (
    <Fragment>
      <VideoScreenWithButtons
        key={`key-${getCurrentQuestionIndex()}`}
        hide={true}
        {...{
          url: Url,
          captionUrl,
          grammar,
          vocabulary,
          notes: Notes,
          video_id,
          level,
          category,
          title,
          description,
          saveNotes,
          language,
          t,
          highlight: [
            {
              time: t || 0,
              text: `Question`,
            },
          ],
          deleteVocabulary,
        }}
      />

      <div style={{ marginTop: "20px" }} />
      <h2 className="ml-3 mb-4 text-black medium-heading">
        Complete the reading comprehension
      </h2>
      <p className="p-3 text-wrap w-100 text-black">{splittedText}</p>
      <CompleteActivityButton
        itemClass={"px-4"}
        onClick={updateStudentAnswer}
        isCompleted={isCurrentExerciseCompleted()}
      />
      <Modal
        {...{
          word,
          pronunciation,
          translation,
          isInVocabularyBank,
          addToVocabulary,
        }}
      />
    </Fragment>
  );
};

const splitText = ({
  text,
  vocabulary,
  setWord,
  setPronunciation,
  getPronunciation,
  setTranslation,
  getTranslation,
  setIsInVocabularyBank,
}) => {
  const vocabularyWordsIndexes = {};
  const sortedVocabulary = vocabulary.sort(
    (a, b) => a.word.length - b.word.length
  );
  for (let element of sortedVocabulary) {
    const location = text.toLowerCase().indexOf(element.word.toLowerCase());
    if (location !== -1) {
      vocabularyWordsIndexes[location] = {
        length: element.word.length,
        definition: element.definition,
      };
    }
  }
  const result = [];

  for (let i = 0; i < text.length; i++) {
    if (vocabularyWordsIndexes[i]) {
      const word = text.substr(i, vocabularyWordsIndexes[i].length);
      const definition = vocabularyWordsIndexes[i].definition;
      result.push(
        <Span
          key={i}
          className="defined"
          onClick={() => {
            setWord(word);
            setIsInVocabularyBank(true);
            setTranslation(definition);
            setPronunciation("");
            getPronunciation({ word }).then((pronunciation) => {
              const { audio } = pronunciation;
              setPronunciation(audio);
            });

            let eventObject = document.createEvent("Events");
            eventObject.initEvent("click", true, false);
            let modelButton = document.getElementById("openModal");
            modelButton.dispatchEvent(eventObject);
          }}
        >
          {word}
        </Span>
      );
      i += vocabularyWordsIndexes[i].length;
    } else {
      const tmp = [];
      while (i < text.length && text[i] !== " " && text[i] !== "\n") {
        tmp.push(text[i]);
        i += 1;
      }
      const word = tmp.join("");
      result.push(
        <Span
          key={i}
          // onClick={async () => {
          //   const processedWord = word.match(/[A-Za-z0-9ÑñáéíóúüÜÁÉÍÓÚ]+/)[0].trim()
          //   setWord(processedWord)
          //   setIsInVocabularyBank(false);
          //   setPronunciation('');
          //   setTranslation('');

          //   let eventObject = document.createEvent('Events')
          //   eventObject.initEvent('click', true, false);
          //   let modelButton = document.getElementById('openModal')
          //   modelButton.dispatchEvent(eventObject);

          //   getPronunciation({
          //     word: processedWord
          //   }).then(
          //     pronunciation => {
          //       const { audio } = pronunciation;
          //       setPronunciation(audio)
          //     }
          //   )
          //   getTranslation({
          //     word: processedWord
          //   }).then(
          //     response => {
          //       const { translation } = response;
          //       setTranslation(translation)
          //     }
          //   )
          // }
          // }
        >
          {word}
        </Span>
      );
    }
    if (text[i] === "\n") result.push(<br />);
    else result.push(text[i]);
  }
  return result;
};

const Modal = ({
  word,
  pronunciation,
  translation,
  isInVocabularyBank,
  addToVocabulary,
}) => (
  <Fragment>
    <button
      style={{ display: "none" }}
      type="button"
      id="openModal"
      data-toggle="modal"
      data-target="#addNewWordForm"
    ></button>
    <div
      className="modal fade"
      id="addNewWordForm"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add new word to your vocabulary
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              <div>
                <span className="font-weight-bold">{word} :</span>
              </div>
              <div>
                <audio
                  className="audio"
                  id="pronunciationAudio"
                  src={`data:audio/wav;base64,${pronunciation}`}
                >
                  Your browser does not support the <code>audio</code> element.
                </audio>
                <div>
                  {!!pronunciation ? (
                    <img
                      src={speaker}
                      style={{ height: "35px", width: "auto" }}
                      onClick={() =>
                        !!pronunciation &&
                        document.getElementById("pronunciationAudio").play()
                      }
                    />
                  ) : (
                    <img
                      src={sandtimer}
                      style={{ height: "35px", width: "auto" }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-100 d-flex flex-column border my-2 p-3 ">
              {translation === "" ? (
                <div>
                  <img
                    src={sandtimer}
                    style={{ height: "35px", width: "auto" }}
                  />
                  Loading translation ...
                </div>
              ) : (
                <div>{translation}</div>
              )}
            </div>
          </div>
          <div
            className="modal-footer align-items-center"
            style={{ fontSize: "13px" }}
          >
            {!isInVocabularyBank && (
              <button
                name="submit"
                type="button"
                className="btn button-blue"
                onClick={() => {
                  addToVocabulary({
                    word,
                    definition: translation,
                  });
                }}
              >
                Add to vocabulary bank
              </button>
            )}
            <button name="cancel" className="btn" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

export default Read;
