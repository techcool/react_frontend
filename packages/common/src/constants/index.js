export const EXERCICES_TITLES = [
  "Watch Video",
  "Vocabulary Gap",
  "Grammar Gap",
  "Listening Choice",
  "True or False",
  "English Rewrite",
  "Read",
  "Visual Choice",
  "Cloze",
  "Put in Order",
  "Write",
  "Record",
  "Short Answer",
  "Long Answer",
];

export const EXERCICES_TITLES_IOCNS = [
  "watch_video.svg",
  "vocabulary_gap.svg",
  "grammar_check.svg",
  "listening_choice.svg",
  "true_false.svg",
  "english_rewrite.svg",
  "read.svg",
  "visual_choice.svg",
  "cloze.svg",
  "put_in_order.svg",
  "write.svg",
  "record.svg",
  "short_answer.svg",
  "long_answer.svg",
];

export const EXERCISES_NEED_CONFIRMATION = ["True or False", "Grammar Gap"];

export const EXERCISE_LISTEN = 0;
export const EXERCISE_FILL_THE_BLANK = 1; //vacabulry gap
export const EXERCISE_FILL_THE_GAPS = 2;
export const EXERCISE_MATCH_AUDIO_DESCRIPTION = 3;
export const EXERCISE_TRUE_FALSE = 4;
export const EXERCISE_REWRITE_THE_STORY_IN_ENGLISH = 5;
export const EXERCISE_READ = 6;
export const EXERCISE_MATCH_VISUAL_DESCRIPTION = 7;
export const EXERCISE_CLOZE = 8;
export const EXERCISE_CHUNK_STORY = 9; // Put in order exercise
export const EXERCISE_WRITE_STORY = 10;
export const EXERCISE_RECORD_RETELL_STORY = 11;
export const EXERCISE_SHORT_ANSWER = 12;
export const EXERCISE_LONG_ANSWER = 13;

export const EXERCISES_IDS = [
  EXERCISE_LISTEN,
  EXERCISE_TRUE_FALSE,
  EXERCISE_MATCH_AUDIO_DESCRIPTION,
  EXERCISE_FILL_THE_BLANK,
  EXERCISE_FILL_THE_GAPS,
  EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
  EXERCISE_READ,
  EXERCISE_MATCH_VISUAL_DESCRIPTION,
  EXERCISE_CLOZE,
  EXERCISE_CHUNK_STORY,
  EXERCISE_SHORT_ANSWER,
  EXERCISE_LONG_ANSWER,
  EXERCISE_WRITE_STORY,
  EXERCISE_RECORD_RETELL_STORY,
];
export const EXERCISES_IDS_SCORED = [
  EXERCISE_TRUE_FALSE,
  EXERCISE_MATCH_AUDIO_DESCRIPTION,
  EXERCISE_FILL_THE_BLANK,
  EXERCISE_FILL_THE_GAPS,
  EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
  EXERCISE_MATCH_VISUAL_DESCRIPTION,
  EXERCISE_CLOZE,
  EXERCISE_CHUNK_STORY,
  EXERCISE_SHORT_ANSWER,
  EXERCISE_LONG_ANSWER,
  EXERCISE_WRITE_STORY,
  EXERCISE_RECORD_RETELL_STORY,
];

export const EXERCISES_IDS_AUTOSCORED = [
  EXERCISE_TRUE_FALSE,
  EXERCISE_MATCH_AUDIO_DESCRIPTION,
  EXERCISE_FILL_THE_BLANK,
  EXERCISE_FILL_THE_GAPS,
  EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
  EXERCISE_MATCH_VISUAL_DESCRIPTION,
  EXERCISE_CLOZE,
  EXERCISE_CHUNK_STORY
];

export const GRADED_EXERCISES_IDS = [
  EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
  EXERCISE_READ,
  EXERCISE_WRITE_STORY,
  EXERCISE_RECORD_RETELL_STORY,
  EXERCISE_SHORT_ANSWER,
  EXERCISE_LONG_ANSWER
];

export const MODE_NORMAL = 0;
export const MODE_REVIEW_QUESTION = 1;
export const MODE_VIEW_ANSWERS = 2;

//Used for student/teacher homepage
export const MODE_SHOW_THUMBNAILS = 0;
export const MODE_SHOW_GRAMMAR = 1;
export const MODE_SHOW_VOCABULARY = 2;
export const MODE_SHOW_NOTES = 3;

export const ACTIVITY_ASSIGNMENT = "assignment";
export const ACTIVITY_PRACTICE = "practice";

export const CATEGORY_NOVICE = 0;
export const CATEGORY_INTERMEDIATE = 1;
export const CATEGORY_BIOGRAPHY = 2;
export const CATEGORY_CULTURAL = 3;
export const CATEGORIES = [
  CATEGORY_NOVICE,
  CATEGORY_INTERMEDIATE,
  CATEGORY_BIOGRAPHY,
  CATEGORY_CULTURAL,
];
export const CATEGORIES_LABELS = {
  [CATEGORY_NOVICE]: "Novice",
  [CATEGORY_INTERMEDIATE]: "Intermediate",
  [CATEGORY_BIOGRAPHY]: "Biographies",
  [CATEGORY_CULTURAL]: "Cultural",
};

export const PRACTICE_ACTIVITY_NOT_STARTED = 0;
export const PRACTICE_ACTIVITY_IN_PROGRESS = 1;
export const PRACTICE_ACTIVITY_COMPLETED = 2;
export const PRACTICE_ACTIVITY_ALL = 3;

export const FLASH_MESSAGES_LIFE_TIME = 5000;

export const GREEN = "#76edcf";
export const BLUE = "#28c2ea";
export const ORANGE = "#ff810a";
export const RED = "#ff0000";
export const GRAY = "#eee";

export const TeacherGrades = [
  { value: 1, label: "K-5" },
  { value: 2, label: "6-8" },
  { value: 3, label: "9-12" },
  { value: -1, label: "Other" },
];
export const StudentGrades = [
  { value: 1, label: "1st" },
  { value: 2, label: "2nd" },
  { value: 3, label: "3rd" },
  { value: 4, label: "4th" },
  { value: 5, label: "5th" },
  { value: 6, label: "6th" },
  { value: 7, label: "7th" },
  { value: 8, label: "8th" },
  { value: 9, label: "9th" },
  { value: 10, label: "10th" },
  { value: 11, label: "11th" },
  { value: 12, label: "12th" },
  { value: -1, label: "Other" },
];

export const SchooldTypes = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
  { value: "others", label: "Others" },
];

export const EXERCICES_TITLES_OBJECT = {
  [EXERCISE_LISTEN]: "Watch Video",
  [EXERCISE_FILL_THE_BLANK]: "Vocabulary Gap",
  [EXERCISE_FILL_THE_GAPS]: "Grammar Gap",
  [EXERCISE_MATCH_AUDIO_DESCRIPTION]: "Listening Choice",
  [EXERCISE_TRUE_FALSE]: "True or False",
  [EXERCISE_REWRITE_THE_STORY_IN_ENGLISH]: "English Rewrite",
  [EXERCISE_READ]: "Read",
  [EXERCISE_MATCH_VISUAL_DESCRIPTION]: "Visual Choice",
  [EXERCISE_CLOZE]: "Cloze",
  [EXERCISE_CHUNK_STORY]: "Put in Order",
  [EXERCISE_WRITE_STORY]: "Write",
  [EXERCISE_RECORD_RETELL_STORY]: "Record",
  [EXERCISE_SHORT_ANSWER]: "Short Answer",
  [EXERCISE_LONG_ANSWER]: "Long Answer",
};

export const WELCOMING_EMAIL_TEACHERS = "teacherWelcoming";
export const WELCOMING_EMAIL_STUDENTS = "studentWelcoming";

export const HOW_DID_HEAR_ABOUT_US_OPTIONS = [
  "Facebook",
  "YouTube",
  "NECTFL",
  "ACTFL",
  "Google",
  "Twitter",
  "LinkedIn",
  "Word of Mouth",
  "Other",
];

