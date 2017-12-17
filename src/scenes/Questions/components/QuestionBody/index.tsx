import React from 'react';
import { View } from 'react-native';
import { IQuestion } from '../../../../services/questions/reducers/index';
import { StudyPhrase } from '../';
import { isReverseQuestion } from '../../../../helpers';
import MultiChoice from './MultiChoice';
import Translation from './Translation';
import Dictation from './Dictation';
import WordSelection from './WordSelection';
import NewWordOrPhrase from './NewWordOrPhrase';
import { ICourse } from '../../../../services/courses/reducers/index';
import { TAnswer } from '../../index.types';
import { HOST } from 'react-native-dotenv';

interface IProps {
  question: IQuestion;
  course: ICourse;
  collectAnswer (answer: TAnswer): void;
}

export default (props: IProps) => {

  const { question, course, collectAnswer } = props;
  let QuestionComponent;
  let showPhraseInHeader = true;

  switch (question.questionType) {
    case 'TRANSLATION':
    case 'TRANSLATION_REVERSE':
      QuestionComponent = Translation;
      break;
    case 'WORD_SELECTION':
    case 'WORD_SELECTION_REVERSE':
      QuestionComponent = WordSelection;
      break;
    case 'DICTATION':
      QuestionComponent = Dictation;
      showPhraseInHeader = false;
      break;
    case 'MULTI_CHOICE':
    case 'MULTI_CHOICE_REVERSE':
      QuestionComponent = MultiChoice;
      break;
    case 'NEW_WORD_OR_PHRASE':
      QuestionComponent = NewWordOrPhrase;
      showPhraseInHeader = false;
      break;
    default:
      console.warn(`Unknown Type ${question.questionType} for ${question}`);
      return null;
  }

  const revrse = isReverseQuestion(question.questionType);

  return <View>
    <StudyPhrase
      sentence={revrse ? question.translation : question.phrase}
      sound={{ soundTrack: `${HOST}/sound/${question.soundFiles[0]}.mp3` }}
      showSentence={showPhraseInHeader}
    />
    <QuestionComponent {...question}
      collectAnswer={collectAnswer}
      course={course}
      reverse={revrse}
    />
  </View>;
};
