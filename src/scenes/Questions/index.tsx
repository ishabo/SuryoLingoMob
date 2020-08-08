import * as React from 'react'
import { BackHandler, Keyboard, Platform, Alert, View } from 'react-native'
import { Bar as ProgressBar } from 'react-native-progress'
import { Container } from 'native-base'
import { isEmpty } from 'lodash'
import {
  navToSkills,
  evalAgainstAllAnswers,
  isReverseQuestion,
  cleanAnswer,
  getWindowWidth,
  getLangConfig,
  isShortDevice,
} from '@sl/helpers'
import { connect } from 'react-redux'
import {
  nextQuestionOrFinish,
  TQuestionType,
} from '@sl/services/questions/actions'
import {
  getActiveCourse,
  calcProress,
  getCurrentQuestion,
  allCorrectAnswers,
  getSkillInProgress,
  getTargetLanguage,
  getSourceLanguage,
} from '@sl/services/selectors'
import { GSCustomStudyText } from '@sl/styles/text'
import Colors from '@sl/styles/colors'
import I18n from '@sl/i18n'
import {
  GSIcon,
  GSProgress,
  GSFooterAndBody,
  GSContainer,
} from './index.styles'
import { GSHeader, GSBody, GSFooter } from '@sl/styles/layouts'
import { IProps, IState, TAnswer } from './index.types'
import { NavigationActions } from 'react-navigation'
import { NextButton, SwitchButton, EvaluationBanner } from '@sl/components'
import { Dispatch } from 'redux'
import { IInitialState } from '@sl/services/reducers'
import QuestionBody from './components/QuestionBody'
import { KeyboardUtils } from 'react-native-keyboard-input'
import analytics from '@react-native-firebase/analytics'

class Questions extends React.Component<IProps, IState> {
  public state = {
    answer: null,
    progress: 0,
    answerCorrect: null,
    modalOn: false,
    movingNext: false,
    keyboardIsOn: false,
  }

  private keyboardDidShowListener
  private keyboardDidHideListener

  private userHasAnswered = () => this.state.answerCorrect !== null

  static navigationOptions = {
    header: null,
    cardStack: {
      transition: (previousRoute: any) => {
        console.warn(previousRoute)
      },
    },
  }

  collectAnswer = (answer: TAnswer) => {
    let cleannedAnswer = answer
    let length = 0

    if (typeof answer === 'string') {
      cleannedAnswer = cleanAnswer(answer)
      length = 1
    }

    if (!this.userHasAnswered() && cleannedAnswer.length > length) {
      this.setState({ answer: cleannedAnswer })
    }
  }

  submitDisallowed = () => isEmpty(this.state.answer) && this.actionNeeded()

  actionNeeded = () =>
    this.props.currentQuestion.questionType !== 'NEW_WORD_OR_PHRASE'

  needsEvaluation = () => this.actionNeeded() && !this.userHasAnswered()

  componentDidMount() {
    this.setState({ progress: this.props.calcProress })
    analytics().setCurrentScreen(this.constructor.name)
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    )
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  private keyboardDidShow = () => {
    this.setState({ keyboardIsOn: true })
  }

  private keyboardDidHide = () => {
    this.setState({ keyboardIsOn: false })
  }

  handleBackPress = () => {
    this.existQuestions()
    return true
  }

  evaluateOrNext = () => {
    if (this.submitDisallowed() || this.state.movingNext) {
      return
    }

    KeyboardUtils.dismiss()
    Keyboard.dismiss()

    if (this.needsEvaluation()) {
      this.evaluate()
    } else {
      this.nextQuestionOrComplete()
    }
  }

  evaluate = () => {
    const targetLangConfig = getLangConfig(this.props.targetLanguage)
    const sourceLangConfig = getLangConfig(this.props.sourceLanguage)

    const evaluationOptions = {
      allowedLetters: targetLangConfig.letters.concat(sourceLangConfig.letters),
      overlookLetters: {
        ...targetLangConfig.overlookLetters,
        ...sourceLangConfig.overlookLetters,
      },
    }

    const answerCorrect = evalAgainstAllAnswers(
      this.state.answer,
      this.props.allCorrectAnswers(this.props.currentQuestion.id),
      evaluationOptions,
    )

    const { id: questionId, questionType } = this.props.currentQuestion

    if (!answerCorrect) {
      analytics().logEvent('incorrect_answer', { questionId, questionType })
    }
    this.setState({ answerCorrect })
  }

  answeredCorrectly = () =>
    !isEmpty(this.state.answer) && this.state.answerCorrect === true

  nextQuestionOrComplete = () => {
    this.setState({ movingNext: true }, () => {
      let status = this.answeredCorrectly() ? 'passed' : 'failed'

      if (!this.actionNeeded()) {
        status = 'passed'
      }
      this.props.nextQuestionOrFinish(this.props.currentQuestion.id, status)
    })
  }

  private backToSkills = () => {
    Keyboard.dismiss()

    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [navToSkills()],
    })
    this.props.navigation.dispatch(resetAction)
  }

  existQuestions = () => {
    Keyboard.dismiss()
    Alert.alert(
      I18n.t('questions.exist.areYouSure'),
      I18n.t('questions.exist.caviat'),
      [
        {
          text: I18n.t('questions.exist.cancel'),
          onPress: () => {
            console.log('Cancelled exist')
          },
          style: 'cancel',
        },
        {
          text: I18n.t('questions.exist.ok'),
          onPress: () => {
            const {
              id: questionId,
              questionType,
              lessonId,
            } = this.props.currentQuestion
            const totalRemainingQuestions = this.props.pending.length
            analytics().logEvent('exist_', {
              lessonId,
              questionId,
              questionType,
              totalRemainingQuestions,
            })
            this.backToSkills()
          },
        },
      ],
      { cancelable: false },
    )
  }

  renderEvaluationBanner() {
    const {
      questionType,
      phrase,
      translation,
      otherCorrectAnswers = [],
    } = this.props.currentQuestion
    const correctAnswers = [
      ...otherCorrectAnswers,
      isReverseQuestion(questionType) ? phrase : translation,
    ]
    const correctAnswer = (
      <GSCustomStudyText
        style={{ fontSize: 16 }}
        lang={
          isReverseQuestion(questionType)
            ? this.props.targetLanguage
            : this.props.sourceLanguage
        }
      >
        {correctAnswers.join(I18n.t('general.comma') + ' ')}
      </GSCustomStudyText>
    )

    return (
      this.userHasAnswered() && (
        <EvaluationBanner
          lang={this.props.sourceLanguage}
          passed={this.state.answerCorrect}
          correctAnswer={correctAnswer}
          multipleAnswers={correctAnswers.length > 1}
        />
      )
    )
  }

  renderProgressBar = () => (
    <GSHeader>
      <GSIcon name='close' onPress={this.existQuestions} />
      <GSProgress>
        <ProgressBar
          progress={this.state.progress}
          height={8}
          width={getWindowWidth() - 70}
          borderColor={Colors.lightGray}
          color={Colors.darkGreen}
          unfilledColor='#d3d3d3'
          animated
          style={{ marginLeft: 10 }}
        />
      </GSProgress>
    </GSHeader>
  )

  renderQuestionBody = () => (
    <QuestionBody
      isAdmin={this.props.profile.isTester}
      course={this.props.course}
      skill={this.props.skillInProgress}
      question={this.props.currentQuestion}
      collectAnswer={this.collectAnswer}
      userHasAnswered={this.userHasAnswered()}
      hints={this.props.dictionaries}
      renderNextButtonSmall={
        this.showSmallButton() ? this.renderNextQuestionSmall() : <View />
      }
      renderNextButton={this.renderNextQuestion()}
      onSubmit={this.evaluateOrNext}
    />
  )

  showSmallButton = () =>
    !this.submitDisallowed() &&
    !this.state.movingNext &&
    this.state.keyboardIsOn &&
    isShortDevice(500)

  renderNextQuestionSmall = () => {
    let text = this.needsEvaluation()
      ? I18n.t('questions.submit')
      : I18n.t('questions.continue')

    return (
      <SwitchButton
        onPress={this.evaluateOrNext}
        lang={this.props.sourceLanguage}
        success
        text={text}
      />
    )
  }

  renderNextQuestion = () => {
    let text = this.needsEvaluation()
      ? I18n.t('questions.submit')
      : I18n.t('questions.continue')

    return (
      <NextButton
        onPress={this.evaluateOrNext}
        disabled={this.submitDisallowed() || this.state.movingNext}
        lang={this.props.sourceLanguage}
        text={text}
      />
    )
  }

  renderBodyAndFooter() {
    return (
      <GSFooterAndBody>
        <GSBody>{this.renderQuestionBody()}</GSBody>
        <GSFooter
          behavior={Platform.select({ android: 'height', ios: 'padding' })}
          keyboardVerticalOffset={Platform.select({ android: 0, ios: 75 })}
          enabled
        >
          {(this.state.keyboardIsOn && isShortDevice(500) && <View />) ||
            this.renderNextQuestion()}
        </GSFooter>
      </GSFooterAndBody>
    )
  }

  render() {
    return (
      (this.props.currentQuestion && (
        <GSContainer>
          {this.renderProgressBar()}
          {this.renderBodyAndFooter()}
          {this.state.movingNext || this.renderEvaluationBanner()}
        </GSContainer>
      )) || <Container />
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  nextQuestionOrFinish: (questionId: string, status: TQuestionType) =>
    dispatch(nextQuestionOrFinish(questionId, status)),
})

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  profile: state.profile,
  questions: state.questions.onGoing,
  pending: state.questions.pending,
  course: getActiveCourse(state),
  calcProress: calcProress(state),
  currentQuestion: getCurrentQuestion(state),
  skillInProgress: getSkillInProgress(state),
  dictionaries: state.dictionaries,
  allCorrectAnswers: (questionId: string) =>
    allCorrectAnswers(state, questionId),
  targetLanguage: getTargetLanguage(state),
  sourceLanguage: getSourceLanguage(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions)
