import React from "react";
import styledComponents from "styled-components";
import ChunkStory from "./exercises/chunkStory";
import Cloze from "./exercises/cloze";
import FillTheBlankForm from "./exercises/fillTheBlank";
import FillTheGaps from "./exercises/fillThegaps";
import MatchAudioDescription from "./exercises/matchAudioDescription";
import MatchVisualDescription from "./exercises/matchVisualDescription";
import Read from "./exercises/read";
import RecordActivity from "./exercises/Record";
import RewriteTheStoryInEnglish from "./exercises/rewriteTheStoryInEnglish";
import { LongAnswer, ShortAnswer } from "./exercises/ShortLongAnswers";
import TrueFalse from "./exercises/trueFalse";
import WriteAStory from "./exercises/writeAStory";
import VideoGammar from "./video/grammar";
import VideoInfo from "./video/video";
import VideoVocabulary from "./video/vocabulary";

const SaveButton = styledComponents.input`
position: fixed;
bottom:0px;
left:0px;
width:200px;
`;

const NewVideo = ({
  handleChanges,
  handleMonths,
  addVocabulary,
  updateVideoDuration,
  deleteVocabularyItem,
  updateVideoCategory,
  save,
  handleSubmit,
  ...methodsAndVariables
}) => (
  <div className="d-flex flex-column flex-column align-items-center">
    <form style={ { width: "800px" } } onSubmit={ handleSubmit }>
      <div className="border px-3 py-2 border-primary mb-2">
        <VideoInfo
          { ...{
            handleChanges,
            handleMonths,
            updateVideoCategory,
            updateVideoDuration,
            ...methodsAndVariables
          } }
        />
        <VideoGammar
          { ...{
            handleChanges,
            ...methodsAndVariables
          } }
        />
        <VideoVocabulary
          { ...{
            addVocabulary,
            deleteVocabularyItem,
            ...methodsAndVariables
          } }
        />
      </div>
      <div className="border px-3 py-2 border-primary mb-2">
        <ShortAnswer { ...{ ...methodsAndVariables } } />
      </div>
      <div className="border px-3 py-2 border-primary mb-2">
        <LongAnswer { ...{ ...methodsAndVariables } } />
      </div>
      <div className="border px-3 py-2 border-primary mb-2">
        <FillTheBlankForm { ...{ ...methodsAndVariables } } />
      </div>
      <div className="border px-3 py-2 border-primary mb-2">
        <FillTheGaps { ...{ ...methodsAndVariables } } />
      </div>
      <div className="border px-3 py-2 border-primary mb-2">
        <MatchAudioDescription { ...{ ...methodsAndVariables } } />
      </div>
      <div className="border px-3 py-2 border-primary mb-2">
        <TrueFalse
          { ...{
            ...methodsAndVariables
          } }
        />
      </div>
      <div className="border px-3 py-2 border-primary mb-2">
        <RewriteTheStoryInEnglish { ...{ ...methodsAndVariables } } />
      </div>
      <div className="border px-3 py-2 border-primary mb-2">
        <Read { ...{ ...methodsAndVariables } } />
      </div>
      <div className="border px-3 py-2 border-primary mb-2">
        <MatchVisualDescription { ...{ ...methodsAndVariables } } />
      </div>
      <div className="border px-3 py-2 border-primary mb-2">
        <Cloze { ...{ ...methodsAndVariables } } />
      </div>
      <div className="border px-3 py-2 border-primary mb-2">
        <ChunkStory { ...{ ...methodsAndVariables } } />
      </div>
      <div className="border px-3 py-2 border-primary mb-2">
        <WriteAStory { ...{ ...methodsAndVariables } } />
      </div>
      <div className="border px-3 py-2 border-primary mb-2">
        <RecordActivity { ...{ ...methodsAndVariables } } />
      </div>
      <SaveButton
        type="button"
        className="btn bg-dark-blue block text-white font-weight-bold"
        value="save"
        onClick={ save }
      />
      <input
        type="submit"
        className="btn btn-primary block full-width m-b my-3 py-4"
        value="Submit"
      />
    </form>
  </div>
);

export default NewVideo;
