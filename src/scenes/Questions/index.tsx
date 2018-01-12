import React from 'react';
import { Keyboard, Alert, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bar as ProgressBar } from 'react-native-progress';
import { Container } from 'native-base';
import { isEmpty } from 'lodash';
import { navToSkills, evalAgainstAllAnswers, isReverseQuestion, cleanAnswer } from 'helpers';
import { connect } from 'react-redux';
import { nextQuestionOrFinish, TQuestionType } from 'services/questions/actions';
import {
  getActiveCourse,
  calcProress,
  getCurrentQuestion,
  allCorrectAnswers,
  getSkillInProgress,
} from 'services/selectors';
import Colors from 'styles/colors';
import Language from 'config/language';
import I18n from 'I18n';
import { QuestionBody, EvaluationBanner } from './components';
import { GSIcon, GSProgress } from './index.styles';
import { GSHeader, GSBody, GSFooter } from 'styles/layout';
import { IProps, IState, TAnswer } from './index.types';
import { NavigationActions } from 'react-navigation';
import NextButton from 'components/NextButton';

class Questions extends React.Component<IProps, IState> {

  public state = {
    answer: null,
    progress: 0,
    answerCorrect: null,
    modalOn: false,
    layoutWidth: 0,
  };

  private userHasAnswered = () =>
    this.state.answerCorrect !== null

  static navigationOptions = {
    header: null,
    cardStack: {
      transition: (previousRoute: any) => { // configure the animation here 
        alert(previousRoute);
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

  submitAllowed = () => isEmpty(this.state.answer)
    && this.actionNeeded()

  actionNeeded = () => this.props.currentQuestion.questionType !== 'NEW_WORD_OR_PHRASE';
  needsEvaluation = () => this.actionNeeded() && !this.userHasAnswered();

  componentWillMount () {
    this.setState({ progress: this.props.calcProress });
  }

  evaluateOrNext = () => {
    Keyboard.dismiss();

    if (this.needsEvaluation()) {
      this.evaluate();
    } else {
      this.nextQuestionOrComplete();
    }
  }

  evaluate = () => {
    const answer = this.state.answer;
    const answerCorrect = evalAgainstAllAnswers(
      typeof answer === 'string' ? [answer] : answer,
      this.props.allCorrectAnswers(this.props.currentQuestion.id),
      Language.arabicLetters.concat(Language.syriacLetters),
    );

    this.setState({ answerCorrect });
  }

  nextQuestionOrComplete = () => {
    const status = this.state.answerCorrect === true || !this.actionNeeded() ? 'passed' : 'failed';
    this.props.nextQuestionOrFinish(this.props.currentQuestion.id, status);
  }

  private backToSkills = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [navToSkills(this.props.course)],
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
    return this.userHasAnswered()
      && <EvaluationBanner
        passed={this.state.answerCorrect}
        correctAnswer={isReverseQuestion(questionType) ? phrase : translation} />;
  }

  renderProgressBar = () =>
    <GSHeader onLayout={(event) => {
      const { width } = event.nativeEvent.layout;
      this.setState({ layoutWidth: width });
    }}>
      <GSProgress>
        <GSIcon name="close" onPress={this.existQuestions} />
        <ProgressBar
          progress={this.state.progress}
          height={8}
          width={this.state.layoutWidth - 80}
          borderColor={Colors.lightGray}
          color={Colors.darkGreen}
          unfilledColor="#d3d3d3"
          animated style={{ marginLeft: 20 }}
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
    />

  renderNextQuestion = () =>
    <NextButton onPress={this.evaluateOrNext}
      disabled={this.submitAllowed()}
      text={
        this.needsEvaluation()
          ? I18n.t('questions.submit')
          : I18n.t('questions.continue')
      } />

  renderBodyAndFooter () {
    const ViewWrapper = Platform.OS === 'android' ? View : KeyboardAvoidingView;
    return <ViewWrapper style={{
      flex: 1,
    }}>
      <GSBody>
        {this.renderQuestionBody()}
      </GSBody>
      <GSFooter>
        {this.renderNextQuestion()}
      </GSFooter>
    </ViewWrapper>;
  }

  render () {
    return this.props.currentQuestion && (
      <Container>
        {this.renderProgressBar()}
        {this.renderBodyAndFooter()}
        {this.renderEvaluationBanner()}
      </Container >
    ) || <View />;
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  nextQuestionOrFinish: (questionId: string, status: TQuestionType) =>
    dispatch(nextQuestionOrFinish(questionId, status)),
});

const mapStateToProps = (state: any) => ({
  questions: state.questions.items,
  pendingQuestions: state.questions.pendingQuestions,
  course: getActiveCourse(state),
  calcProress: calcProress(state),
  currentQuestion: getCurrentQuestion(state),
  skillInProgress: getSkillInProgress(state),
  dictionaries: state.dictionaries,
  allCorrectAnswers: (questionId: string) => allCorrectAnswers(state, questionId),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
