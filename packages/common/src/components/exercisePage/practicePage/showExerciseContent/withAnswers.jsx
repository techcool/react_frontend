import { ShowExercicesWithoutAnswers } from './withoutAnswers'
import fillTheBlank from './exercisesWithAnswers/fillTheBlank';
import fillTheGaps from './exercisesWithAnswers/fillTheGaps'
import matchAudioDescription from './exercisesWithAnswers/matchAudioDescription';
import matchVisualDescription from './exercisesWithAnswers/matchVisualDescription';
import trueFlase from './exercisesWithAnswers/trueFalse';
import cloze from './exercisesWithAnswers/cloze';
import chunkStory from './exercisesWithAnswers/chunkStory';
import {
  ShortAnswer as shortAnswer,
  LongAnswer as longAnswer,
} from './exercisesWithEvaluation/shortLongAnswers';


const ShowExercicesWithAnswers = ({
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
}) => ShowExercicesWithoutAnswers({
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
export { ShowExercicesWithAnswers }
export default ShowExercicesWithAnswers({})