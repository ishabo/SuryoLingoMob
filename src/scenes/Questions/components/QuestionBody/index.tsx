import * as React from "react";
import { Keyboard } from "react-native";
import { WebView } from "react-native-webview";
import { Container, Icon } from "native-base";
import { IQuestion } from "@sl/services/questions";
import * as skill from "@sl/services/skills";
import * as course from "@sl/services/courses";
import { isReverseQuestion, hintify } from "@sl/helpers";
import I18n from "@sl/i18n";
import glamor from "glamorous-native";
import { TAnswer } from "@sl/scenes/Questions/index.types";
import MultiChoice from "./MultiChoice";
import Translation from "./Translation";
import Dictation from "./Dictation";
import WordSelection from "./WordSelection";
import NewWordOrPhrase from "./NewWordOrPhrase";
import { isEmpty, camelCase } from "lodash";
import Modal from "react-native-modal";
import shortid from "shortid";
import Colors from "@sl/styles/colors";
import { IDictionary } from "@sl/services/dictionaries";
import { downloadAndPlayAudio } from "@sl/helpers/audio";
import { SwitchButton, StudyPhrase } from "@sl/components";
import { KeyboardUtils } from "react-native-keyboard-input";
import garshonify from "garshonify";
import { Analytics } from "@sl/config/firebase";
import { logError } from "@sl/helpers";

interface IProps {
  question: IQuestion;
  course: course.ICourse;
  skill: skill.ISkill;
  collectAnswer(answer: TAnswer): void;
  userHasAnswered: boolean;
  hints: IDictionary[];
  renderNextButton: React.ReactElement<any>;
  renderNextButtonSmall: React.ReactElement<any>;
  isAdmin?: boolean;
  onSubmit: () => void;
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
    if (
      soundTrack &&
      this.state.audioHasPlayed === false &&
      this.showAndPlaySound()
    ) {
      this.setState({ audioHasPlayed: true }, async () => {
        await downloadAndPlayAudio(soundTrack);
      });
    }
  }

  private switchGarshoni = () => {
    this.setState({ garshoniToggle: !this.state.garshoniToggle });
  };

  private switchFromDictationToTranslation = () => {
    Analytics.logEvent("cannot_hear_clicked", {
      questionId: this.props.question.id
    });
    this.setState({
      dictationToTranslationToggle: !this.state.dictationToTranslationToggle
    });
  };

  private renderGarshoniSwitch = () => {
    if (isReverseQuestion(this.props.question.questionType)) {
      return null;
    }

    const buttonProps = this.state.garshoniToggle
      ? { success: true }
      : { light: true };

    return (
      <SwitchButton
        key={shortid.generate()}
        onPress={() => {
          this.switchGarshoni();
        }}
        text={I18n.t("questions.garshoni")}
        {...buttonProps}
        lang={this.props.course.sourceLanguage.shortName}
      />
    );
  };

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
    if (this.props.question.questionType !== "DICTATION") {
      return null;
    }

    return (
      this.state.dictationToTranslationToggle || (
        <SwitchButton
          key={shortid.generate()}
          onPress={() => {
            this.switchFromDictationToTranslation();
          }}
          text={I18n.t("questions.cannotHear")}
          light={true}
          lang={this.props.course.sourceLanguage.shortName}
        />
      )
    );
  };

  private showAndPlaySound = () => {
    const { questionType } = this.props.question;
    if (questionType === "DICTATION") {
      return !this.state.dictationToTranslationToggle;
    }
    return !isReverseQuestion(questionType);
  };

  private listOptions = () =>
    [
      this.renderDescriptionSwitch(),
      this.renderGarshoniSwitch(),
      this.renderDictationToTranslationSwitch()
    ].filter(n => n);

  private toggleSkillDescription = (modalOn: boolean) =>
    this.setState({ modalOn }, () => {
      if (this.state.modalOn) {
        Keyboard.dismiss();
        KeyboardUtils.dismiss();
      }
    });

  private renderModal = () => (
    <Modal isVisible={this.state.modalOn} style={{ borderRadius: 30 }}>
      <GSIcon name="close" onPress={() => this.toggleSkillDescription(false)} />
      <WebView
        source={{ html: this.props.skill.description }}
        scalesPageToFit
      />
    </Modal>
  );

  private pathToSoundTrack = (): string =>
    this.props.question.soundFiles.length > 0
      ? this.props.question.soundFiles[0]
      : null;

  private getSentence = (reverse: boolean) => {
    const { question, course } = this.props;

    const langConfig = {
      source: camelCase(course.targetLanguage.shortName),
      target: camelCase(course.sourceLanguage.shortName)
    };

    let rawSentence = reverse ? question.translation : question.phrase;
    let hintifiedSentence = reverse
      ? null
      : hintify(
          question.phrase,
          this.props.hints,
          course.targetLanguage.shortName
        );

    if (this.state.garshoniToggle && !reverse) {
      rawSentence = garshonify({
        sentence: question.phrase,
        langConfig,
        byCombo: true
      });
      hintifiedSentence = null;
    }

    return { raw: rawSentence, hintified: hintifiedSentence };
  };

  private prepareTemplate = () => {
    const { question } = this.props;
    let QuestionComponent;
    let showPhraseInHeader = true;
    let reverse = isReverseQuestion(question.questionType);
    let centralizeAudio = false;

    switch (question.questionType) {
      case "TRANSLATION":
      case "TRANSLATION_REVERSE":
        QuestionComponent = Translation;
        break;
      case "WORD_SELECTION":
      case "WORD_SELECTION_REVERSE":
        QuestionComponent = WordSelection;
        break;
      case "DICTATION":
        QuestionComponent = this.state.dictationToTranslationToggle
          ? Translation
          : Dictation;
        showPhraseInHeader = this.state.dictationToTranslationToggle;
        reverse = true;
        break;
      case "MULTI_CHOICE":
      case "MULTI_CHOICE_REVERSE":
        QuestionComponent = MultiChoice;
        break;
      case "NEW_WORD_OR_PHRASE":
        QuestionComponent = NewWordOrPhrase;
        showPhraseInHeader = false;
        centralizeAudio = true;
        break;
      default:
        logError(
          `Unknown Type ${question.questionType} for ${JSON.stringify(
            question
          )}`
        );
        return null;
    }

    return { QuestionComponent, showPhraseInHeader, reverse, centralizeAudio };
  };

  render() {
    const { question, collectAnswer, userHasAnswered, course } = this.props;
    const {
      reverse,
      QuestionComponent,
      showPhraseInHeader,
      centralizeAudio
    } = this.prepareTemplate();
    const options = this.listOptions();
    const lang = course[
      reverse || this.state.garshoniToggle ? "sourceLanguage" : "targetLanguage"
    ].shortName as TLangs;
    const sentence = this.getSentence(reverse);

    return (
      <GSContainer>
        <GSActionButtons>
          {this.props.renderNextButtonSmall}
          {options.length > 0 && <GSOptions>{options}</GSOptions>}
        </GSActionButtons>

        <StudyPhrase
          sentence={sentence}
          sound={
            this.showAndPlaySound() && { soundTrack: this.pathToSoundTrack() }
          }
          showSentence={showPhraseInHeader}
          lang={lang}
          centralize={centralizeAudio}
          isAdmin={this.props.isAdmin}
        />

        <QuestionComponent
          {...question}
          sentence={sentence}
          collectAnswer={collectAnswer}
          userHasAnswered={userHasAnswered}
          course={course}
          reverse={reverse}
          lang={lang}
          onSubmit={this.props.onSubmit}
          renderNextButton={this.props.renderNextButton}
        />

        {this.renderModal()}
      </GSContainer>
    );
  }
}

const GSContainer = glamor(Container)({
  flex: 1,
  justifyContent: "flex-start"
});

const GSActionButtons = glamor.view({
  justifyContent: "space-between",
  flexDirection: "row",
  marginBottom: 10,
  alignSelf: "stretch"
});

const GSOptions = glamor.view({
  flexDirection: "row",
  justifyContent: "flex-end"
});

export const GSIcon = glamor(Icon)({
  position: "absolute",
  right: 15,
  top: 10,
  fontSize: 40,
  color: Colors.black,
  zIndex: 100
});

export default QuestionBody;
