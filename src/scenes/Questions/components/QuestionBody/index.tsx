import React from 'react';
import { KeyboardAvoidingView, Text, WebView } from 'react-native';
import { Button, Icon } from 'native-base';
import { IQuestion } from 'services/questions';
import * as skill from 'services/skills';
import * as course from 'services/courses';
import { StudyPhrase } from '../';
import { isReverseQuestion, toGarshoni, hintify } from 'helpers';
import I18n from 'I18n';
import glamor from 'glamorous-native';
import { TAnswer } from '../../index.types';
import { HOST } from 'react-native-dotenv';
import MultiChoice from './MultiChoice';
import Translation from './Translation';
import Dictation from './Dictation';
import WordSelection from './WordSelection';
import NewWordOrPhrase from './NewWordOrPhrase';
import { isEmpty } from 'lodash';
import Modal from 'react-native-modal';
import shortid from 'shortid';
import Colors from 'styles/colors';
import { IDictionary } from 'services/dictionaries';
import { downloadAndPlayAudio } from 'helpers/audio';

interface IProps {
  question: IQuestion;
  course: course.ICourse;
  skill: skill.ISkill;
  collectAnswer (answer: TAnswer): void;
  userHasAnswered: boolean;
  hints: IDictionary[];
}

interface IState {
  garshoniToggle: boolean;
  modalOn: boolean;
}

const SwitchOption = (props: {
  onPress: () => void;
  success?: boolean;
  bordered?: boolean;
  light?: boolean;
  text: string;
}) =>
  <GSSwitch
    rounded
    {...props}
  >
    <Text>{props.text}</Text>
  </GSSwitch>;

class QuestionBody extends React.Component<IProps, IState> {

  state = {
    garshoniToggle: false,
    modalOn: false,
  };

  componentDidMount () {
    const soundTrack = this.pathToSoundTrack();
    if (soundTrack) {
      downloadAndPlayAudio(soundTrack);
    }
  }

  private switchGarshoni = () => {
    this.setState({ garshoniToggle: !this.state.garshoniToggle });
  }

  private renderGarshoniSwitch = () => {

    if (isReverseQuestion(this.props.question.questionType)) {
      return null;
    }

    const buttonProps = this.state.garshoniToggle ?
      { success: true } : { light: true };

    return <SwitchOption
      key={shortid.generate()}
      onPress={() => { this.switchGarshoni(); }}
      text={I18n.t('questions.garshoni')}
      {...buttonProps}
    />;
  }

  private renderDescriptionSwitch = () => {
    if (isEmpty(this.props.skill.description)) {
      return null;
    }
    return <SwitchOption
      key={shortid.generate()}
      onPress={() => { this.toggleSkillDescription(true); }}
      text={this.props.skill.name}
      light
    />;
  }

  private listOptions = () =>
    [
      this.renderDescriptionSwitch(),
      this.renderGarshoniSwitch(),
    ].filter(n => n)

  private toggleSkillDescription = (modalOn: boolean) =>
    this.setState({ modalOn })

  private renderModal = () =>
    <Modal isVisible={this.state.modalOn} style={{ borderRadius: 30 }}>
      <GSIcon name="close" onPress={() => this.toggleSkillDescription(false)} />
      <WebView
        source={{ html: this.props.skill.description }}
        scalesPageToFit
      />
    </Modal>

  private pathToSoundTrack = (): string => {
    if (this.props.question.soundFiles[0]) {
      return `${HOST}/sound/${this.props.question.soundFiles[0]}.mp4`;
    }
    return null;
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
        console.warn(`Unknown Type ${question.questionType} for ${JSON.stringify(question)}`);
        return null;
    }

    const sentence = this.state.garshoniToggle ? toGarshoni({
      sentence: question.phrase,
      targetLang: course.learnersLanguage.shortName,
      sentenceLang: course.targetLanguage.shortName,
    }) : hintify(question.phrase, this.props.hints);

    const options = this.listOptions();

    return <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: 'flex-start' }}>
      {options.length > 0 &&
        <GSOptions>
          {options}
        </GSOptions>
      }

      <StudyPhrase
        sentence={reverse ? question.translation : sentence}
        sound={{ soundTrack: this.pathToSoundTrack() }}
        showSentence={showPhraseInHeader}
        lang={course[reverse ? 'learnersLanguage' : 'targetLanguage'].shortName as TLangs}
      />

      <QuestionComponent {...question}
        phrase={sentence}
        collectAnswer={collectAnswer}
        userHasAnswered={userHasAnswered}
        course={course}
        reverse={reverse}
      />

      {this.renderModal()}
    </KeyboardAvoidingView>;
  }
}

const GSSwitch = glamor(Button)({
  paddingVertical: 0,
  marginHorizontal: 5,
  paddingHorizontal: 10,
  height: 30,
});

const GSOptions = glamor.view({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignSelf: 'stretch',
  marginBottom: 10,
  alignItems: 'center',
});

export const GSIcon = glamor(Icon)({
  position: 'absolute',
  right: 15,
  top: 10,
  fontSize: 40,
  color: Colors.black,
  zIndex: 100,
});

export default QuestionBody;
