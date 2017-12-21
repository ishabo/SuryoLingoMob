import React from 'react';
import { Keyboard, Alert, View, KeyboardAvoidingView } from 'react-native';
import { Bar as ProgressBar } from 'react-native-progress';
import { Container } from 'native-base';
import { isEmpty } from 'lodash';
import { navToSkills, evalAgainstAllAnswers, isReverseQuestion } from '../../helpers';
import { connect } from 'react-redux';
import { nextQuestionOrFinish, TQuestionType } from '../../services/questions/actions';
import {
  getActiveCourse,
  calcProress,
  getCurrentQuestion,
  allCorrectAnswers,
} from '../../services/selectors';
import Colors from '../../styles/colors';
import config from '../../config';
import I18n from '../../i18n';
import { NextButton, QuestionBody, EvaluationBanner } from './components';
import { GSBody, GSFooter, GSHeader, GSIcon, GSProgress } from './index.styles';
import { IProps, IState, TAnswer } from './index.types';
import { NavigationActions } from 'react-navigation';

class Questions extends React.Component<IProps, IState> {

  public state = {
    answer: null,
    progress: 0,
    answerCorrect: null,
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
    if (!this.userHasAnswered()) {
      this.setState({ answer });
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
      config.arabicLetters.concat(config.syriacLetters),
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

  render () {
    const question = this.props.currentQuestion;
    return question && (
      <Container>
        <GSHeader>
          <GSProgress>
            <ProgressBar
              progress={this.state.progress}
              width={300}
              height={8}
              borderColor={Colors.lightGray}
              color={Colors.darkGreen}
              unfilledColor="#d3d3d3"
              animated style={{ marginLeft: 10 }}
            />
          </GSProgress>
          <GSIcon name="close" onPress={this.existQuestions} />
        </GSHeader>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          {this.renderEvaluationBanner()}
          <GSBody>
            <QuestionBody
              course={this.props.course}
              question={this.props.currentQuestion}
              collectAnswer={this.collectAnswer}
              userHasAnswered={this.userHasAnswered()}
            />
          </GSBody>
          <GSFooter>
            <NextButton onPress={this.evaluateOrNext} disabled={this.submitAllowed()} text={
              this.needsEvaluation()
                ? I18n.t('questions.submit')
                : I18n.t('questions.continue')
            } />
          </GSFooter>
        </KeyboardAvoidingView>
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
  allCorrectAnswers: (questionId: string) => allCorrectAnswers(state, questionId),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
