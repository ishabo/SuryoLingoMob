import * as React from 'react';
import { WebView } from 'react-native';
import { Container, Icon } from 'native-base';
import { IQuestion } from 'services/questions';
import * as skill from 'services/skills';
import * as course from 'services/courses';
import { StudyPhrase } from '../';
import { isReverseQuestion, hintify, openPhraseInAdmin } from 'helpers';
import I18n from 'I18n';
import glamor from 'glamorous-native';
import { TAnswer } from '../../index.types';
import MultiChoice from './MultiChoice';
import Translation from './Translation';
import Dictation from './Dictation';
import WordSelection from './WordSelection';
import NewWordOrPhrase from './NewWordOrPhrase';
import { isEmpty, camelCase } from 'lodash';
import Modal from 'react-native-modal';
import shortid from 'shortid';
import Colors from 'styles/colors';
import { IDictionary } from 'services/dictionaries';
import { downloadAndPlayAudio } from 'helpers/audio';
import { SwitchButton } from 'components';
import garshonify from 'garshonify';

interface IProps {
  question: IQuestion;
  course: course.ICourse;
  skill: skill.ISkill;
  collectAnswer(answer: TAnswer): void;
  userHasAnswered: boolean;
  hints: IDictionary[];
  renderNextButton: React.ReactElement<any>;
  isAdmin?: boolean;
}

interface IState {
  garshoniToggle: boolean;
  modalOn: boolean;
  audioHasPlayed: boolean;
  dictationToTranslationToggle: boolean;
}

class QuestionBody extends React.Component<IProps, IState> {
  state = {
    modalOn: false,
    garshoniToggle: false,
    audioHasPlayed: false,
    dictationToTranslationToggle: false
  };

  componentDidMount() {
    const soundTrack = this.pathToSoundTrack();
    if (soundTrack && this.state.audioHasPlayed === false && this.showAndPlaySound()) {
      this.setState({ audioHasPlayed: true }, async () => {
        await downloadAndPlayAudio(soundTrack);
      });
    }
  }

  private switchGarshoni = () => {
    this.setState({ garshoniToggle: !this.state.garshoniToggle });
  };

  private switchFromDictationToTranslation = () => {
    this.setState({ dictationToTranslationToggle: !this.state.dictationToTranslationToggle });
  };

  private renderGarshoniSwitch = () => {
    if (isReverseQuestion(this.props.question.questionType)) {
      return null;
    }

    const buttonProps = this.state.garshoniToggle ? { success: true } : { light: true };

    return (
      <SwitchButton
        key={shortid.generate()}
        onPress={() => {
          this.switchGarshoni();
        }}
        text={I18n.t('questions.garshoni')}
        {...buttonProps}
        lang={this.props.course.sourceLanguage.shortName}
      />
    );
  };

  private renderEditLink = () => (
    <SwitchButton
      key={shortid.generate()}
      onPress={() => openPhraseInAdmin(this.props.question.phrase)}
      text={I18n.t('questions.correction')}
      light={true}
      lang={this.props.course.sourceLanguage.shortName}
    />
  );

  private renderDescriptionSwitch = () => {
    if (isEmpty(this.props.skill.description)) {
      return null;
    }
    return (
      <SwitchButton
        key={shortid.generate()}
        onPress={() => {
          this.toggleSkillDescription(true);
        }}
        text={this.props.skill.name}
        light
        lang={this.props.course.sourceLanguage.shortName}
      />
    );
  };

  private renderDictationToTranslationSwitch = () => {
    if (this.props.question.questionType !== 'DICTATION') {
      return null;
    }

    return (
      this.state.dictationToTranslationToggle || (
        <SwitchButton
          key={shortid.generate()}
          onPress={() => {
            this.switchFromDictationToTranslation();
          }}
          text={I18n.t('questions.cannotHear')}
          light={true}
          lang={this.props.course.sourceLanguage.shortName}
        />
      )
    );
  };

  private showAndPlaySound = () => {
    const { questionType } = this.props.question;
    if (questionType === 'DICTATION') {
      return !this.state.dictationToTranslationToggle;
    } else {
      return !isReverseQuestion(questionType);
    }
  };

  private listOptions = () =>
    [this.renderDescriptionSwitch(), this.renderGarshoniSwitch(), this.renderDictationToTranslationSwitch()].filter(
      n => n
    );

  private toggleSkillDescription = (modalOn: boolean) => this.setState({ modalOn });

  private renderModal = () => (
    <Modal isVisible={this.state.modalOn} style={{ borderRadius: 30 }}>
      <GSIcon name="close" onPress={() => this.toggleSkillDescription(false)} />
      <WebView source={{ html: this.props.skill.description }} scalesPageToFit />
    </Modal>
  );

  private pathToSoundTrack = (): string =>
    this.props.question.soundFiles.length > 0 ? this.props.question.soundFiles[0] : null;

  render() {
    const { question, course, collectAnswer, userHasAnswered } = this.props;
    let QuestionComponent;
    let showPhraseInHeader = true;
    let reverse = isReverseQuestion(question.questionType);
    let centralizeAudio = false;

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
        QuestionComponent = this.state.dictationToTranslationToggle ? Translation : Dictation;
        showPhraseInHeader = this.state.dictationToTranslationToggle;
        reverse = true;
        break;
      case 'MULTI_CHOICE':
      case 'MULTI_CHOICE_REVERSE':
        QuestionComponent = MultiChoice;
        break;
      case 'NEW_WORD_OR_PHRASE':
        QuestionComponent = NewWordOrPhrase;
        showPhraseInHeader = false;
        centralizeAudio = true;
        break;
      default:
        console.warn(`Unknown Type ${question.questionType} for ${JSON.stringify(question)}`);
        return null;
    }

    const langConfig = {
      source: camelCase(course.targetLanguage.shortName),
      target: camelCase(course.sourceLanguage.shortName)
    };
    const sentence = this.state.garshoniToggle
      ? garshonify({
          sentence: question.phrase,
          langConfig,
          byCombo: true
        })
      : hintify(question.phrase, this.props.hints);

    let options = this.listOptions();
    if (this.props.isAdmin) {
      options.push(this.renderEditLink());
    }
    const lang = course[reverse || this.state.garshoniToggle ? 'sourceLanguage' : 'targetLanguage'].shortName as TLangs;

    return (
      <GSContainer>
        <GSActionButtons>
          {this.props.renderNextButton}

          {options.length > 0 && <GSOptions>{options}</GSOptions>}
        </GSActionButtons>

        <StudyPhrase
          sentence={reverse ? question.translation : sentence}
          sound={this.showAndPlaySound() && { soundTrack: this.pathToSoundTrack() }}
          showSentence={showPhraseInHeader}
          lang={lang}
          centralize={centralizeAudio}
        />

        <QuestionComponent
          {...question}
          sentence={sentence}
          collectAnswer={collectAnswer}
          userHasAnswered={userHasAnswered}
          course={course}
          reverse={reverse}
          lang={lang}
        />

        {this.renderModal()}
      </GSContainer>
    );
  }
}

const GSContainer = glamor(Container)({
  flex: 1,
  justifyContent: 'flex-start'
});

const GSActionButtons = glamor.view({
  justifyContent: 'space-between',
  flexDirection: 'row',
  marginBottom: 10,
  alignSelf: 'stretch'
});

const GSOptions = glamor.view({
  flexDirection: 'row',
  justifyContent: 'flex-end'
});

export const GSIcon = glamor(Icon)({
  position: 'absolute',
  right: 15,
  top: 10,
  fontSize: 40,
  color: Colors.black,
  zIndex: 100
});

export default QuestionBody;
