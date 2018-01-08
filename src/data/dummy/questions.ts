export default [
  {
    id: 'question-id1',
    lessonId: 'lesson-id',
    questionType: 'TRANSLATION',
    phrase: 'phrase 1',
    soundFiles: ['sound-id1.mp3'],
    translation: 'translation of phrase 1',
    otherCorrectAnswers: ['another translation of phrase 1'],
  },
  {
    id: 'question-id2',
    lessonId: 'lesson-id',
    questionType: 'TRANSLATION_REVERSE',
    phrase: 'phrase 2',
    soundFiles: ['sound-id2.mp3'],
    translation: 'translation of phrase 2',
    otherCorrectAnswers: ['another translation of phrase 2'],
  },
  {
    id: 'question-id3',
    lessonId: 'lesson-id',
    questionType: 'NEW_WORD_OR_PHRASE',
    phrase: 'phrase 3',
    soundFiles: ['sound-id3.mp3'],
    translation: 'translation of phrase 3',
  },
  {
    id: 'question-id4',
    lessonId: 'lesson-id',
    questionType: 'WORD_SELECTION',
    phrase: 'phrase 4',
    soundFiles: ['sound-id4.mp3'],
    translation: 'translation of phrase 4',
    otherCorrectAnswers: ['whatever', 'phase'],
  },
  {
    id: 'question-id5',
    lessonId: 'lesson-id',
    questionType: 'MULTI_CHOICE',
    phrase: 'phrase 5',
    soundFiles: ['sound-id5.mp3'],
    translation: 'translation of phrase 5',
    incorrectChoices: ['wrong translation of phrase 5', 'another wrong translation of phrase 5'],
  },
];
