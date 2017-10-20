declare module 'react-native-sound';

interface IDictionary<T> {
    [key: string]: T
}

type TQuestionType = string | 'TRANSLATION' | 'WORD_SELECTION' | 'MULTI_CHOICE' | 'PICTURE_SELETION' | 'DICTATION';
type TLangs = 'ar' | 'sy';
type TAnswer = string | string[];

interface IStudyPhrase { text: string; soundFile?: string; }
interface IQuestion {
    questionType: TQuestionType;
    studyPhrase: IStudyPhrase;
    correctAnswers: string | string[];
    possibleAnswers?: string | string[];
    targetLang: TLangs;
}
interface ILesson {
    lessonId: number;
    questions: IQuestion[];
    newWords: string[];
}
interface IModule {
    id: number;
    level: number;
    unit: number;
    name: string;
    lessons: ILesson[];
    icons: {
        inactive: string;
        active: string;
        completed: string;
    },
};