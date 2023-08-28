import { ShowExercicesWithAnswers } from '../../practicePage/showExerciseContent/withAnswers';
import WriteAStory from './exercises/writeAStory';
import RewriteTheStoryInEnglish from './exercises/rewriteTheStoryInEnglish';
import RecordAndPlay from './exercises/recordAndPlay';
import Closing from './exercises/closing';
import {
  ShortAnswer,
  LongAnswer,
} from './exercises/shortLongAnswers';

export default ShowExercicesWithAnswers(
  {
    RewriteTheStoryInEnglish,
    WriteAStory,
    RecordAndPlay,
    Closing,
    ShortAnswer,
    LongAnswer,
  }
);