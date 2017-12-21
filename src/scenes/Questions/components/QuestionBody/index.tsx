import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import { IQuestion } from '../../../../services/questions/reducers/index';
import { StudyPhrase } from '../';
import { isReverseQuestion, toGarshoni } from '../../../../helpers';
import MultiChoice from './MultiChoice';
import Translation from './Translation';
import Dictation from './Dictation';
import WordSelection from './WordSelection';
import NewWordOrPhrase from './NewWordOrPhrase';
import { ICourse } from '../../../../services/courses/reducers/index';
import { TAnswer } from '../../index.types';
import { HOST } from 'react-native-dotenv';
import I18n from '../../../../i18n';
import glamor from 'glamorous-native';

interface IProps {
  question: IQuestion;
  course: ICourse;
  collectAnswer (answer: TAnswer): void;
  userHasAnswered: boolean;
}

interface IState {
  garshoniToggle: boolean;
}

export default class extends React.Component<IProps, IState> {

  state = {
    garshoniToggle: false,
  };

  private switchGarshoni = () => {
    this.setState({ garshoniToggle: !this.state.garshoniToggle });
  }

  render () {
    const { question, course, collectAnswer, userHasAnswered } = this.props;
    let QuestionComponent;
    let showPhraseInHeader = true;
    let reverse = isReverseQuestion(question.questionType);

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
        reverse = true;
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

    const sentence = this.state.garshoniToggle ? toGarshoni({
      sentence: question.phrase,
      targetLang: 'cl-ara',
      sentenceLang: 'cl-syr',
    }) : question.phrase;

    const buttonProps = this.state.garshoniToggle ?
      { success: true } : { bordered: true };
    return <View>
      <GSOptions>
        {reverse || <GSSwitch
          onPress={this.switchGarshoni}
          rounded
          {...buttonProps}
        >
          <Text>{I18n.t('questions.garshoni')}</Text>
        </GSSwitch>}
      </GSOptions>

      <StudyPhrase
        sentence={reverse ? question.translation : sentence}
        sound={{ soundTrack: `${HOST}/sound/${question.soundFiles[0]}.mp3` }}
        showSentence={showPhraseInHeader}
      />
      <QuestionComponent {...question}
        phrase={sentence}
        collectAnswer={collectAnswer}
        userHasAnswered={userHasAnswered}
        course={course}
        reverse={reverse}
      />
    </View>;
  }
}

const GSSwitch = glamor(Button)({
  paddingVertical: 0,
  alignItems: 'center',
  paddingHorizontal: 10,
  height: 30,
});

const GSOptions = glamor.view({
  position: 'absolute',
  right: 0,
  top: -30,
});
