import React from "react";
import {
  EXERCISE_LISTEN,
  EXERCISE_FILL_THE_BLANK,
  EXERCISE_MATCH_AUDIO_DESCRIPTION,
  EXERCISE_MATCH_VISUAL_DESCRIPTION,
  EXERCISE_TRUE_FALSE,
  EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
  EXERCISE_READ,
  EXERCISE_CLOZE,
  EXERCISE_WRITE_STORY,
  EXERCISE_CHUNK_STORY,
  EXERCISE_RECORD_RETELL_STORY,
  EXERCISE_FILL_THE_GAPS,
  EXERCISE_SHORT_ANSWER,
  EXERCISE_LONG_ANSWER,
} from "common/src/constants";
import listen from "./exercises/listen";
import fillTheBlank from "./exercises/fillTheBlank";
import fillTheGaps from "./exercises/fillTheGaps";
import matchAudioDescription from "./exercises/matchAudioDescription";
import matchVisualDescription from "./exercises/matchVisualDescription";
import trueFlase from "./exercises/trueFalse";
import rewriteTheStoryInEnglish from "./exercises/rewriteTheStoryInEnglish";
import read from "./exercises/read";
import cloze from "./exercises/cloze";
import writeAStory from "./exercises/writeAStory";
import chunkStory from "./exercises/chunkStory";
import recordAndPlay from "./exercises/recordAndPlay";
import closing from "./exercises/closing";
import {
  ShortAnswer as shortAnswer,
  LongAnswer as longAnswer,
} from "./exercises/shortLongAnswers";
const ShowExercicesWithoutAnswers =
  ({
    Listen = listen,
    FillTheBlank = fillTheBlank,
    FillTheGaps = fillTheGaps,
    MatchAudioDescription = matchAudioDescription,
    MatchVisualDescription = matchVisualDescription,
    TrueFlase = trueFlase,
    RewriteTheStoryInEnglish = rewriteTheStoryInEnglish,
    Read = read,
    Cloze = cloze,
    WriteAStory = writeAStory,
    ChunkStory = chunkStory,
    RecordAndPlay = recordAndPlay,
    Closing = closing,
    ShortAnswer = shortAnswer,
    LongAnswer = longAnswer,
  }) =>
  ({ ...methods }) => {
    const { getCurrentExerciseID } = methods;
    switch (getCurrentExerciseID()) {
      case EXERCISE_LISTEN:
        return <Listen {...methods} />;
      case EXERCISE_FILL_THE_BLANK:
        return <FillTheBlank {...methods} />;
      case EXERCISE_FILL_THE_GAPS:
        return <FillTheGaps {...methods} />;
      case EXERCISE_MATCH_AUDIO_DESCRIPTION:
        return <MatchAudioDescription {...methods} />;
      case EXERCISE_MATCH_VISUAL_DESCRIPTION:
        return <MatchVisualDescription {...methods} />;
      case EXERCISE_TRUE_FALSE:
        return <TrueFlase {...methods} />;
      case EXERCISE_REWRITE_THE_STORY_IN_ENGLISH:
        return <RewriteTheStoryInEnglish {...methods} />;
      case EXERCISE_READ:
        return <Read {...methods} />;
      case EXERCISE_CLOZE:
        return <Cloze {...methods} />;
      case EXERCISE_WRITE_STORY:
        return <WriteAStory {...methods} />;
      case EXERCISE_CHUNK_STORY:
        return <ChunkStory {...methods} />;
      case EXERCISE_RECORD_RETELL_STORY:
        return <RecordAndPlay {...methods} />;
      case EXERCISE_SHORT_ANSWER:
        return <ShortAnswer {...methods} />;
      case EXERCISE_LONG_ANSWER:
        return <LongAnswer {...methods} />;

      default:
        return <Closing {...methods} />;
    }
  };
export { ShowExercicesWithoutAnswers };
export default ShowExercicesWithoutAnswers({});
