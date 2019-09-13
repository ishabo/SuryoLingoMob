import * as React from 'react';
import { BackHandler, Keyboard, Platform, Alert, View } from 'react-native';
import { Bar as ProgressBar } from 'react-native-progress';
import { Container } from 'native-base';
import { isEmpty } from 'lodash';
import { navToSkills, evalAgainstAllAnswers, isReverseQuestion, cleanAnswer, getWindowWidth, getLangConfig, isShortDevice } from 'helpers';
import { connect } from 'react-redux';
import { nextQuestionOrFinish } from 'services/questions/actions';
import { getActiveCourse, calcProress, getCurrentQuestion, allCorrectAnswers, getSkillInProgress, getTargetLanguage, getSourceLanguage } from 'services/selectors';
import { GSCustomStudyText } from 'styles/text';
import Colors from 'styles/colors';
import I18n from 'I18n';
import { GSIcon, GSProgress, GSFooterAndBody, GSContainer } from './index.styles';
import { GSHeader, GSBody, GSFooter } from 'styles/layouts';
import { NavigationActions } from 'react-navigation';
import { NextButton, SwitchButton, EvaluationBanner } from 'components';
import QuestionBody from './components/QuestionBody';
import { KeyboardUtils } from 'react-native-keyboard-input';
import { Analytics } from 'config/firebase';
class Questions extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            answer: null,
            progress: 0,
            answerCorrect: null,
            modalOn: false,
            movingNext: false,
            keyboardIsOn: false
        };
        this.userHasAnswered = () => this.state.answerCorrect !== null;
        this.collectAnswer = (answer) => {
            let cleannedAnswer = answer;
            let length = 0;
            if (typeof answer === 'string') {
                cleannedAnswer = cleanAnswer(answer);
                length = 1;
            }
            if (!this.userHasAnswered() && cleannedAnswer.length > length) {
                this.setState({ answer: cleannedAnswer });
            }
        };
        this.submitDisallowed = () => isEmpty(this.state.answer) && this.actionNeeded();
        this.actionNeeded = () => this.props.currentQuestion.questionType !== 'NEW_WORD_OR_PHRASE';
        this.needsEvaluation = () => this.actionNeeded() && !this.userHasAnswered();
        this.keyboardDidShow = () => {
            this.setState({ keyboardIsOn: true });
        };
        this.keyboardDidHide = () => {
            this.setState({ keyboardIsOn: false });
        };
        this.handleBackPress = () => {
            this.existQuestions();
            return true;
        };
        this.evaluateOrNext = () => {
            if (this.submitDisallowed() || this.state.movingNext) {
                return;
            }
            KeyboardUtils.dismiss();
            Keyboard.dismiss();
            if (this.needsEvaluation()) {
                this.evaluate();
            }
            else {
                this.nextQuestionOrComplete();
            }
        };
        this.evaluate = () => {
            const targetLangConfig = getLangConfig(this.props.targetLanguage);
            const sourceLangConfig = getLangConfig(this.props.sourceLanguage);
            const evaluationOptions = {
                allowedLetters: targetLangConfig.letters.concat(sourceLangConfig.letters),
                overlookLetters: Object.assign({}, targetLangConfig.overlookLetters, sourceLangConfig.overlookLetters)
            };
            const answerCorrect = evalAgainstAllAnswers(this.state.answer, this.props.allCorrectAnswers(this.props.currentQuestion.id), evaluationOptions);
            const { id: questionId, questionType } = this.props.currentQuestion;
            if (!answerCorrect) {
                Analytics.logEvent('incorrect_answer', { questionId, questionType });
            }
            this.setState({ answerCorrect });
        };
        this.answeredCorrectly = () => !isEmpty(this.state.answer) && this.state.answerCorrect === true;
        this.nextQuestionOrComplete = () => {
            this.setState({ movingNext: true }, () => {
                let status = this.answeredCorrectly() ? 'passed' : 'failed';
                if (!this.actionNeeded()) {
                    status = 'passed';
                }
                this.props.nextQuestionOrFinish(this.props.currentQuestion.id, status);
            });
        };
        this.backToSkills = () => {
            Keyboard.dismiss();
            const resetAction = NavigationActions.reset({
                index: 0,
                key: null,
                actions: [navToSkills()]
            });
            this.props.navigation.dispatch(resetAction);
        };
        this.existQuestions = () => {
            Keyboard.dismiss();
            Alert.alert(I18n.t('questions.exist.areYouSure'), I18n.t('questions.exist.caviat'), [
                {
                    text: I18n.t('questions.exist.cancel'),
                    onPress: () => {
                        console.log('Cancelled exist');
                    },
                    style: 'cancel'
                },
                {
                    text: I18n.t('questions.exist.ok'),
                    onPress: () => {
                        const { id: questionId, questionType, lessonId } = this.props.currentQuestion;
                        const totalRemainingQuestions = this.props.pending.length;
                        Analytics.logEvent('exist_', { lessonId, questionId, questionType, totalRemainingQuestions });
                        this.backToSkills();
                    }
                }
            ], { cancelable: false });
        };
        this.renderProgressBar = () => (React.createElement(GSHeader, null,
            React.createElement(GSIcon, { name: "close", onPress: this.existQuestions }),
            React.createElement(GSProgress, null,
                React.createElement(ProgressBar, { progress: this.state.progress, height: 8, width: getWindowWidth() - 70, borderColor: Colors.lightGray, color: Colors.darkGreen, unfilledColor: "#d3d3d3", animated: true, style: { marginLeft: 10 } }))));
        this.renderQuestionBody = () => (React.createElement(QuestionBody, { isAdmin: this.props.profile.isTester, course: this.props.course, skill: this.props.skillInProgress, question: this.props.currentQuestion, collectAnswer: this.collectAnswer, userHasAnswered: this.userHasAnswered(), hints: this.props.dictionaries, renderNextButtonSmall: this.showSmallButton() ? this.renderNextQuestionSmall() : React.createElement(View, null), renderNextButton: this.renderNextQuestion(), onSubmit: this.evaluateOrNext }));
        this.showSmallButton = () => !this.submitDisallowed() && !this.state.movingNext && this.state.keyboardIsOn && isShortDevice(500);
        this.renderNextQuestionSmall = () => {
            let text = this.needsEvaluation() ? I18n.t('questions.submit') : I18n.t('questions.continue');
            return React.createElement(SwitchButton, { onPress: this.evaluateOrNext, lang: this.props.sourceLanguage, success: true, text: text });
        };
        this.renderNextQuestion = () => {
            let text = this.needsEvaluation() ? I18n.t('questions.submit') : I18n.t('questions.continue');
            return (React.createElement(NextButton, { onPress: this.evaluateOrNext, disabled: this.submitDisallowed() || this.state.movingNext, lang: this.props.sourceLanguage, text: text }));
        };
    }
    componentWillMount() {
        Analytics.setCurrentScreen(this.constructor.name);
        this.setState({ progress: this.props.calcProress });
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    renderEvaluationBanner() {
        const { questionType, phrase, translation, otherCorrectAnswers = [] } = this.props.currentQuestion;
        const correctAnswers = [...otherCorrectAnswers, isReverseQuestion(questionType) ? phrase : translation];
        const correctAnswer = (React.createElement(GSCustomStudyText, { style: { fontSize: 16 }, lang: isReverseQuestion(questionType) ? this.props.targetLanguage : this.props.sourceLanguage }, correctAnswers.join(I18n.t('general.comma') + ' ')));
        return (this.userHasAnswered() && (React.createElement(EvaluationBanner, { lang: this.props.sourceLanguage, passed: this.state.answerCorrect, correctAnswer: correctAnswer, multipleAnswers: correctAnswers.length > 1 })));
    }
    renderBodyAndFooter() {
        return (React.createElement(GSFooterAndBody, null,
            React.createElement(GSBody, null, this.renderQuestionBody()),
            React.createElement(GSFooter, { behavior: Platform.select({ android: 'height', ios: 'padding' }), keyboardVerticalOffset: Platform.select({ android: 0, ios: 75 }), enabled: true }, (this.state.keyboardIsOn && isShortDevice(500) && React.createElement(View, null)) || this.renderNextQuestion())));
    }
    render() {
        return ((this.props.currentQuestion && (React.createElement(GSContainer, null,
            this.renderProgressBar(),
            this.renderBodyAndFooter(),
            this.state.movingNext || this.renderEvaluationBanner()))) || React.createElement(Container, null));
    }
}
Questions.navigationOptions = {
    header: null,
    cardStack: {
        transition: (previousRoute) => {
            console.warn(previousRoute);
        }
    }
};
const mapDispatchToProps = (dispatch) => ({
    nextQuestionOrFinish: (questionId, status) => dispatch(nextQuestionOrFinish(questionId, status))
});
const mapStateToProps = (state) => ({
    profile: state.profile,
    questions: state.questions.onGoing,
    pending: state.questions.pending,
    course: getActiveCourse(state),
    calcProress: calcProress(state),
    currentQuestion: getCurrentQuestion(state),
    skillInProgress: getSkillInProgress(state),
    dictionaries: state.dictionaries,
    allCorrectAnswers: (questionId) => allCorrectAnswers(state, questionId),
    targetLanguage: getTargetLanguage(state),
    sourceLanguage: getSourceLanguage(state)
});
export default connect(mapStateToProps, mapDispatchToProps)(Questions);
//# sourceMappingURL=index.js.map