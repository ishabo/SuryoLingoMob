import React from 'react';
import { StyleSheet, Keyboard, Alert } from 'react-native';
import { Bar as ProgressBar } from 'react-native-progress';
import {
  Container,
  View,
  Icon,
  Body,
  Text,
  Button,
} from 'native-base';
import Colors from '../../styles/colors';
import I18n from '../../i18n';
import MultiChoice from './MultiChoice';
import Translation from './Translation';
import Dictation from './Dictation';
import WordSelection from './WordSelection';
import StudyPhrase from '../../components/StudyPhrase';
import { isEmpty } from 'lodash';
import { NavigationScreenProp } from 'react-navigation';
import EvaluationBanner from '../../components/EvaluationBanner';
import { evalAgainstAllAnswers } from '../../helpers/evaluation';
import config from '../../config';
import { backToModules } from '../../helpers/navigation'
export type TAnswer = string | string[];

export interface IState {
  answer: TAnswer;
  progress: number;
  answerCorrect: boolean;
}

export interface IAnswerProps {
  collectAnswer: (answer: TAnswer) => void;
}

interface IProps {
  navigation: NavigationScreenProp<any, any>
}

export default class Questions extends React.Component<IProps, IState> {

  public state = {
    answer: null,
    progress: 0,
    answerCorrect: null
  };

  static navigationOptions = {
    header: null,
    cardStack: {
      transition: (previousRoute: any) => { // configure the animation here 
        alert(previousRoute);
      },
    },
  };

  collectAnswer = (answer: TAnswer) => {
    if (this.state.answerCorrect === null) {
      this.setState({ answer });
    }
  }

  submitAllowed = () => isEmpty(this.state.answer);

  getCurrentQuestion = () => {
    const { questions, currentQuestionIndex } = this.props.navigation.state.params;
    return questions[currentQuestionIndex];
  }

  componentWillMount () {
    const { questions, currentQuestionIndex } = this.props.navigation.state.params;
    const progress = currentQuestionIndex / questions.length;
    this.setState({ progress });
  }

  determineQuestionType = () => {
    let QuestionComponent;
    const question = this.getCurrentQuestion();

    switch (question.questionType) {
      case 'TRANSLATION':
        QuestionComponent = Translation;
        break;
      case 'WORD_SELECTION':
        QuestionComponent = WordSelection;
        break;
      case 'DICTATION':
        QuestionComponent = Dictation;
        break;
      case 'MULTI_CHOICE':
        QuestionComponent = MultiChoice;
        break;
      default:
        throw new Error('Unknown Type');
    }
    const course = this.props.navigation.state.params.course;
    return <QuestionComponent {...question } course={course} collectAnswer={this.collectAnswer} />;
  }

  evaluateOrNext = () => {
    Keyboard.dismiss();
    if (this.state.answerCorrect === null) {
      this.evaluate();
    } else {
      this.nextQuestion();
    }
  }

  evaluate = () => {
    if (typeof evalAgainstAllAnswers === 'function') {
      const answerCorrect = evalAgainstAllAnswers(
        this.state.answer,
        this.getCurrentQuestion().correctAnswers,
        config.arabicLetters.concat(config.syriacLetters),
      );

      this.setState({ answerCorrect });
    } else {
      alert(typeof evalAgainstAllAnswers);
    }
  }

  nextQuestion = () => {
    const { navigate, state } = this.props.navigation;
    const { questions, currentQuestionIndex, failedQuestions, course } = state.params;
    const evaluateOrNextIndex = currentQuestionIndex + 1;
    const { lessonId } = this.getCurrentQuestion();
    const navToNextQuestion = () => navigate('Questions', {
      course,
      questions,
      currentQuestionIndex: evaluateOrNextIndex,
    });

    if (questions[evaluateOrNextIndex]) {
      navToNextQuestion();
    } else {
      if (failedQuestions && failedQuestions[0]) {
        navToNextQuestion();
      } else {
        navigate('Completion', { lessonId });
      }
    }
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
            backToModules(this.props.navigation);
          },
        },
      ],
      { cancelable: false },
    );
  }

  renderEvaluationBanner () {
    const { correctAnswers } = this.getCurrentQuestion();
    return this.state.answerCorrect !== null
      && <EvaluationBanner
        passed={this.state.answerCorrect}
        answer={this.state.answer}
        correctAnswer={correctAnswers[0]} />;
  }

  render () {
    const question = this.getCurrentQuestion();
    return (
      <Container>
        {this.renderEvaluationBanner()}
        <View style={styles.header}>
          <View style={styles.progress}>
            <ProgressBar
              progress={this.state.progress}
              width={270}
              borderColor={Colors.lightGray}
              color={Colors.green}
              unfilledColor="#d3d3d3"
              animated style={{ height: 5 }}
            />
          </View>
          <Icon name="close" style={styles.close} onPress={this.existQuestions} />
        </View>
        <Body style={styles.body}>
          <StudyPhrase
            sentence={question.studyPhrase.text}
            sound={{ soundTrack: question.studyPhrase.soundFile }}
            showSentence={question.questionType !== 'DICTATION'}
          />
          {this.determineQuestionType()}
        </Body>
        <View style={styles.footer}>
          <Button
            primary
            rounded
            block
            disabled={this.submitAllowed()}
            style={{ width: 300, alignSelf: 'center' }}
            onPress={this.evaluateOrNext}
          >
            <Text style={{ alignSelf: 'center' }}>
              {this.state.answerCorrect === null ? I18n.t('questions.submit') : I18n.t('questions.continue')}
            </Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    height: 60
  },
  body: {
    marginTop: 40,
    flex: 1,
    alignContent: 'stretch',
    width: 340,
  },
  footer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    marginBottom: 10,
  },
  progress: {
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    paddingTop: 40,
    borderWidth: 0
  },
  close: {
    position: 'absolute',
    left: 15,
    top: 22,
    fontSize: 40,
    color: 'gray'
  }
});