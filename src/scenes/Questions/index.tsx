import * as React from 'react';
import { BackHandler, Keyboard, Alert, View } from 'react-native';
import { Bar as ProgressBar } from 'react-native-progress';
import { Container } from 'native-base';
import { isEmpty } from 'lodash';
import {
  navToSkills, evalAgainstAllAnswers, isReverseQuestion,
  cleanAnswer, getWindowWidth, isNarrowDevice,
} from 'helpers';
import { connect } from 'react-redux';
import { nextQuestionOrFinish, TQuestionType } from 'services/questions/actions';
import {
  getActiveCourse,
  calcProress,
  getCurrentQuestion,
  allCorrectAnswers,
  getSkillInProgress,
  getTargetLanguage,
  getLearnersLanguage,
} from 'services/selectors';
import { GSCustomText } from 'styles/text';
import Colors from 'styles/colors';
import { getLangConfig } from 'config/language';
import I18n from 'I18n';
import { QuestionBody, EvaluationBanner } from './components';
import { GSIcon, GSProgress, GSFooterAndBody, GSContainer } from './index.styles';
import { GSHeader, GSBody, GSFooter } from 'styles/layouts';
import { IProps, IState, TAnswer } from './index.types';
import { NavigationActions } from 'react-navigation';
import { NextButton, SwitchButton } from 'components';

class Questions extends React.Component<IProps, IState> {

  public state = {
    answer: null,
    progress: 0,
    answerCorrect: null,
    modalOn: false,
    movingNext: false,
    keyboardIsOn: false,
  };

  private keyboardDidShowListener;
  private keyboardDidHideListener;

  private userHasAnswered = () =>
    this.state.answerCorrect !== null

  static navigationOptions = {
    header: null,

    cardStack: {
      transition: (previousRoute: any) => { // configure the animation here 
        console.warn(previousRoute);
      },
    },
  };

  collectAnswer = (answer: TAnswer) => {
    let cleannedAnswer = answer;
    let length = 0;

    if (typeof answer === 'string') {
      cleannedAnswer = cleanAnswer(answer);
      length = 1;
    }

    if (!this.userHasAnswered() && cleannedAnswer.length > length) {
      this.setState({ answer: cleannedAnswer });
    }
  }

  submitDisallowed = () => isEmpty(this.state.answer) && this.actionNeeded()

  actionNeeded = () => this.props.currentQuestion.questionType !== 'NEW_WORD_OR_PHRASE';

  needsEvaluation = () => this.actionNeeded() && !this.userHasAnswered();

  componentWillMount () {
    this.setState({ progress: this.props.calcProress });
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  private keyboardDidShow = () => {
    this.setState({ keyboardIsOn: true });
  }

  private keyboardDidHide = () => {
    this.setState({ keyboardIsOn: false });
  }

  handleBackPress = () => {
    this.existQuestions();
    return true;
  }

  evaluateOrNext = () => {
    if (this.submitDisallowed() || this.state.movingNext) {
      return;
    }

    Keyboard.dismiss();

    if (this.needsEvaluation()) {
      this.evaluate();
    } else {
      this.nextQuestionOrComplete();
    }
  }

  evaluate = () => {
    const targetLangConfig = getLangConfig(this.props.targetLanguage);
    const learnersLangConfig = getLangConfig(this.props.learnersLanguage);

    const evaluationOptions = {
      allowedLetters: targetLangConfig.letters.concat(learnersLangConfig.letters),
      overlookLetters: { ...targetLangConfig.overlookLetters, ...learnersLangConfig.overlookLetters },
    };
    const answer = this.state.answer;
    const answerCorrect = evalAgainstAllAnswers(
      typeof answer === 'string' ? [answer] : answer,
      this.props.allCorrectAnswers(this.props.currentQuestion.id),
      evaluationOptions,
    );

    this.setState({ answerCorrect });
  }

  answeredCorrectly = () => !isEmpty(this.state.answer) && this.state.answerCorrect === true;

  nextQuestionOrComplete = () => {
    this.setState({ movingNext: true }, () => {
      let status = this.answeredCorrectly() ? 'passed' : 'failed';

      if (!this.actionNeeded()) {
        status = 'passed';
      }
      this.props.nextQuestionOrFinish(this.props.currentQuestion.id, status);
    });
  }

  private backToSkills = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [navToSkills(this.props.profile)],
    });
    this.props.navigation.dispatch(resetAction);
  }

  existQuestions = () => {
    Alert.alert(
      I18n.t('questions.exist.areYouSure'),
      I18n.t('questions.exist.caviat'),
      [
        {
          text: I18n.t('questions.exist.cancel'), onPress: () => {
            console.log('Cancelled exist');
          }, style: 'cancel',
        },
        {
          text: I18n.t('questions.exist.ok'), onPress: () => {
            this.backToSkills();
          },
        },
      ],
      { cancelable: false },
    );
  }

  renderEvaluationBanner () {
    const { questionType, phrase, translation } = this.props.currentQuestion;
    const correctAnswer = <GSCustomText style={{ fontSize: 16 }}
      lang={isReverseQuestion(questionType) ? this.props.targetLanguage : this.props.learnersLanguage}>
      {isReverseQuestion(questionType) ? phrase : translation}
    </GSCustomText>

    return this.userHasAnswered()
      && <EvaluationBanner
        lang={this.props.learnersLanguage}
        passed={this.state.answerCorrect}
        correctAnswer={correctAnswer} />;
  }

  renderProgressBar = () =>
    <GSHeader>
      <GSIcon name="close" onPress={this.existQuestions} />
      <GSProgress>
        <ProgressBar
          progress={this.state.progress}
          height={8}
          width={getWindowWidth() - 70}
          borderColor={Colors.lightGray}
          color={Colors.darkGreen}
          unfilledColor="#d3d3d3"
          animated style={{ marginLeft: 10 }}
        />
      </GSProgress>
    </GSHeader>

  renderQuestionBody = () =>
    <QuestionBody
      course={this.props.course}
      skill={this.props.skillInProgress}
      question={this.props.currentQuestion}
      collectAnswer={this.collectAnswer}
      userHasAnswered={this.userHasAnswered()}
      hints={this.props.dictionaries}
      renderNextButton={this.showSmallButton() ? this.renderNextQuestionSmall() : <View />}
    />

  showSmallButton = () => !this.submitDisallowed() && !this.state.movingNext && this.state.keyboardIsOn && isNarrowDevice()

  renderNextQuestionSmall = () => {
    let text = this.needsEvaluation()
      ? I18n.t('questions.submit')
      : I18n.t('questions.continue')

    return <SwitchButton onPress={this.evaluateOrNext}
      lang={this.props.learnersLanguage}
      success
      text={text} />
  }

  renderNextQuestion = () => {
    let text = this.needsEvaluation()
      ? I18n.t('questions.submit')
      : I18n.t('questions.continue')

    return <NextButton onPress={this.evaluateOrNext}
      disabled={this.submitDisallowed() || this.state.movingNext}
      lang={this.props.learnersLanguage}
      text={text} />
  }


  renderBodyAndFooter () {
    return <GSFooterAndBody>
      <GSBody>
        {this.renderQuestionBody()}
      </GSBody>
      <GSFooter>
        {(this.state.keyboardIsOn && isNarrowDevice()) && <View /> || this.renderNextQuestion()}
      </GSFooter>
    </GSFooterAndBody>;
  }

  render () {
    return this.props.currentQuestion && (
      <GSContainer>
        {this.renderProgressBar()}
        {this.renderBodyAndFooter()}
        {this.state.movingNext || this.renderEvaluationBanner()}
      </GSContainer >
    ) || <Container />;
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  nextQuestionOrFinish: (questionId: string, status: TQuestionType) =>
    dispatch(nextQuestionOrFinish(questionId, status)),
});

const mapStateToProps = (state: any) => ({
  profile: state.profile,
  questions: state.questions.onGoing,
  pending: state.questions.pending,
  course: getActiveCourse(state),
  calcProress: calcProress(state),
  currentQuestion: getCurrentQuestion(state),
  skillInProgress: getSkillInProgress(state),
  dictionaries: state.dictionaries,
  allCorrectAnswers: (questionId: string) => allCorrectAnswers(state, questionId),
  targetLanguage: getTargetLanguage(state),
  learnersLanguage: getLearnersLanguage(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
