import * as tslib_1 from "tslib";
import * as React from 'react';
import { WebView, Keyboard } from 'react-native';
import { Container, Icon } from 'native-base';
import { isReverseQuestion, hintify } from 'helpers';
import I18n from 'I18n';
import glamor from 'glamorous-native';
import MultiChoice from './MultiChoice';
import Translation from './Translation';
import Dictation from './Dictation';
import WordSelection from './WordSelection';
import NewWordOrPhrase from './NewWordOrPhrase';
import { isEmpty, camelCase } from 'lodash';
import Modal from 'react-native-modal';
import shortid from 'shortid';
import Colors from 'styles/colors';
import { downloadAndPlayAudio } from 'helpers/audio';
import { SwitchButton, StudyPhrase } from 'components';
import { KeyboardUtils } from 'react-native-keyboard-input';
import garshonify from 'garshonify';
import { Analytics } from 'config/firebase';
import { logError } from 'helpers';
class QuestionBody extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            modalOn: false,
            garshoniToggle: false,
            audioHasPlayed: false,
            dictationToTranslationToggle: false
        };
        this.switchGarshoni = () => {
            this.setState({ garshoniToggle: !this.state.garshoniToggle });
        };
        this.switchFromDictationToTranslation = () => {
            Analytics.logEvent('cannot_hear_clicked', { questionId: this.props.question.id });
            this.setState({ dictationToTranslationToggle: !this.state.dictationToTranslationToggle });
        };
        this.renderGarshoniSwitch = () => {
            if (isReverseQuestion(this.props.question.questionType)) {
                return null;
            }
            const buttonProps = this.state.garshoniToggle ? { success: true } : { light: true };
            return (React.createElement(SwitchButton, Object.assign({ key: shortid.generate(), onPress: () => {
                    this.switchGarshoni();
                }, text: I18n.t('questions.garshoni') }, buttonProps, { lang: this.props.course.sourceLanguage.shortName })));
        };
        this.renderDescriptionSwitch = () => {
            if (isEmpty(this.props.skill.description)) {
                return null;
            }
            return (React.createElement(SwitchButton, { key: shortid.generate(), onPress: () => {
                    this.toggleSkillDescription(true);
                }, text: this.props.skill.name, light: true, lang: this.props.course.sourceLanguage.shortName }));
        };
        this.renderDictationToTranslationSwitch = () => {
            if (this.props.question.questionType !== 'DICTATION') {
                return null;
            }
            return (this.state.dictationToTranslationToggle || (React.createElement(SwitchButton, { key: shortid.generate(), onPress: () => {
                    this.switchFromDictationToTranslation();
                }, text: I18n.t('questions.cannotHear'), light: true, lang: this.props.course.sourceLanguage.shortName })));
        };
        this.showAndPlaySound = () => {
            const { questionType } = this.props.question;
            if (questionType === 'DICTATION') {
                return !this.state.dictationToTranslationToggle;
            }
            else {
                return !isReverseQuestion(questionType);
            }
        };
        this.listOptions = () => [this.renderDescriptionSwitch(), this.renderGarshoniSwitch(), this.renderDictationToTranslationSwitch()].filter(n => n);
        this.toggleSkillDescription = (modalOn) => this.setState({ modalOn }, () => {
            if (this.state.modalOn) {
                Keyboard.dismiss();
                KeyboardUtils.dismiss();
            }
        });
        this.renderModal = () => (React.createElement(Modal, { isVisible: this.state.modalOn, style: { borderRadius: 30 } },
            React.createElement(GSIcon, { name: "close", onPress: () => this.toggleSkillDescription(false) }),
            React.createElement(WebView, { source: { html: this.props.skill.description }, scalesPageToFit: true })));
        this.pathToSoundTrack = () => this.props.question.soundFiles.length > 0 ? this.props.question.soundFiles[0] : null;
        this.getSentence = (reverse) => {
            const { question, course } = this.props;
            const langConfig = {
                source: camelCase(course.targetLanguage.shortName),
                target: camelCase(course.sourceLanguage.shortName)
            };
            let rawSentence = reverse ? question.translation : question.phrase;
            let hintifiedSentence = reverse
                ? null
                : hintify(question.phrase, this.props.hints, course.targetLanguage.shortName);
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
        this.prepareTemplate = () => {
            const { question } = this.props;
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
                    logError(`Unknown Type ${question.questionType} for ${JSON.stringify(question)}`);
                    return null;
            }
            return { QuestionComponent, showPhraseInHeader, reverse, centralizeAudio };
        };
    }
    componentDidMount() {
        const soundTrack = this.pathToSoundTrack();
        if (soundTrack && this.state.audioHasPlayed === false && this.showAndPlaySound()) {
            this.setState({ audioHasPlayed: true }, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield downloadAndPlayAudio(soundTrack);
            }));
        }
    }
    render() {
        const { question, collectAnswer, userHasAnswered, course } = this.props;
        const { reverse, QuestionComponent, showPhraseInHeader, centralizeAudio } = this.prepareTemplate();
        const options = this.listOptions();
        const lang = course[reverse || this.state.garshoniToggle ? 'sourceLanguage' : 'targetLanguage'].shortName;
        const sentence = this.getSentence(reverse);
        return (React.createElement(GSContainer, null,
            React.createElement(GSActionButtons, null,
                this.props.renderNextButtonSmall,
                options.length > 0 && React.createElement(GSOptions, null, options)),
            React.createElement(StudyPhrase, { sentence: sentence, sound: this.showAndPlaySound() && { soundTrack: this.pathToSoundTrack() }, showSentence: showPhraseInHeader, lang: lang, centralize: centralizeAudio, isAdmin: this.props.isAdmin }),
            React.createElement(QuestionComponent, Object.assign({}, question, { sentence: sentence, collectAnswer: collectAnswer, userHasAnswered: userHasAnswered, course: course, reverse: reverse, lang: lang, onSubmit: this.props.onSubmit, renderNextButton: this.props.renderNextButton })),
            this.renderModal()));
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
//# sourceMappingURL=index.js.map