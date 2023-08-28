import { ShowExercicesWithoutAnswers } from './withoutAnswers'
import fillTheBlank from './exercisesWithEvaluation/fillTheBlank';
import fillTheGaps from './exercisesWithEvaluation/fillTheGaps'
import matchAudioDescription from './exercisesWithEvaluation/matchAudioDescription';
import matchVisualDescription from './exercisesWithEvaluation/matchVisualDescription';
import trueFlase from './exercisesWithEvaluation/trueFalse';
import cloze from './exercisesWithEvaluation/cloze';
import chunkStory from './exercisesWithEvaluation/chunkStory';
import {
  ShortAnswer as shortAnswer,
  LongAnswer as longAnswer,
} from './exercisesWithEvaluation/shortLongAnswers';

const ShowExercicesWithEvaluation = (
  {
    FillTheBlank = fillTheBlank,
    FillTheGaps = fillTheGaps,
    MatchAudioDescription = matchAudioDescription,
    MatchVisualDescription = matchVisualDescription,
    TrueFlase = trueFlase,
    Cloze = cloze,
    ChunkStory = chunkStory,
    ShortAnswer = shortAnswer,
    LongAnswer = longAnswer,
    RewriteTheStoryInEnglish,
    WriteAStory,
    RecordAndPlay,
    Closing,
  }
) => ShowExercicesWithoutAnswers({
  FillTheBlank,
  FillTheGaps,
  MatchAudioDescription,
  MatchVisualDescription,
  TrueFlase,
  Cloze,
  ChunkStory,
  ShortAnswer,
  LongAnswer,
  RewriteTheStoryInEnglish,
  WriteAStory,
  RecordAndPlay,
  Closing,
})
export { ShowExercicesWithEvaluation }
export default ShowExercicesWithEvaluation({})