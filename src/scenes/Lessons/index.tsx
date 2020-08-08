import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { BackHandler, Keyboard } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { ILesson } from '@sl/services/skills'
import { enterLesson, overviewLesson } from '@sl/services/progress/actions'
import { IInitialState } from '@sl/services/reducers'
import {
  getSkillLessons,
  getSourceLanguage,
  getTargetLanguage,
} from '@sl/services/selectors'
import { NavigationScreenProp } from 'react-navigation'
import { GSCustomText } from '@sl/styles/text'
import { IProfile } from '@sl/services/profile'

import analytics from '@react-native-firebase/analytics'
import I18n from '@sl/i18n'
import { SkillIcon } from '../Skills/components'
import {
  GSContainer,
  GSAnimatable,
  GSLessonIcon,
  GSLessonInstruction,
} from './index.styles'
import Lesson from './components/Lesson'

interface IProps {
  getLessons(skillId: string): ILesson[]
  enterLesson(lessonId: string): void
  previewLesson: (lessonId: string) => void
  navigation: NavigationScreenProp<any, any>
  sourceLanguage: TLangs
  targetLanguage: TLangs
  profile: IProfile
  loading: boolean
}

interface IState {
  snapped: boolean
}

class Lessons extends React.Component<IProps, IState> {
  state = {
    snapped: false,
  }

  private carousal

  private cards

  static navigationOptions = ({ navigation }) => ({
    title: I18n.t('lessons.title', {
      skill: navigation.state.params.skill.name,
    }),
    headerBackTitle: '',
  })

  private getNumOfActiveLessons = (): number => this.getFinishedLesson().length

  private getFinishedLesson = (): ILesson[] =>
    this.props
      .getLessons(this.getSkill().id)
      .filter((lesson: ILesson) => lesson.finished)

  private getSkill = () => this.props.navigation.state.params.skill

  private totalLessons = () => this.getSkill().lessons.length

  componentDidMount() {
    analytics().setCurrentScreen(this.constructor.name)
    Keyboard.dismiss()

    if (this.state.snapped === false) {
      this.cards.fadeInUp()
      setTimeout(this.snapToItem, 1200)
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    this.props.navigation.goBack()
    return true
  }

  private snapToItem = () => {
    if (this.carousal) {
      this.setState({ snapped: true }, () => {
        const itemIndex =
          this.getNumOfActiveLessons() === this.totalLessons()
            ? this.totalLessons() - 1
            : this.getNumOfActiveLessons()

        this.carousal.snapToItem(itemIndex)
      })
    }
  }

  private isLessonActive = (lesson: ILesson): boolean => {
    if (this.props.profile.isTester) {
      return true
    }
    if (lesson.finished || lesson.order === 1) {
      return true
    }
    const previousOrder = this.getFinishedLesson().find(
      (l: ILesson) => l.order === lesson.order - 1,
    )
    return previousOrder && previousOrder.finished
  }

  private renderCards({ item: lesson }) {
    return (
      <Lesson
        skill={this.props.navigation.state.params.skill}
        lesson={lesson}
        active={this.isLessonActive(lesson)}
        enterLesson={this.props.enterLesson}
        previewLesson={this.props.previewLesson}
        targetLanguage={this.props.targetLanguage}
        sourceLanguage={this.props.sourceLanguage}
        loading={this.props.loading}
      />
    )
  }

  render() {
    const { skill } = this.props.navigation.state.params
    return (
      <GSContainer>
        <GSLessonIcon>
          <SkillIcon
            icon={this.props.navigation.state.params.skill.icon}
            state='unlocked'
            size='xxxhdpi'
          />
        </GSLessonIcon>
        <GSLessonInstruction>
          <GSCustomText lang={this.props.sourceLanguage}>
            {I18n.t('lessons.instruction')}
          </GSCustomText>
        </GSLessonInstruction>
        <GSAnimatable innerRef={(c: Lessons) => (this.cards = c)}>
          <Carousel
            ref={(c: Lessons) => (this.carousal = c)}
            data={this.props.getLessons(skill.id)}
            renderItem={this.renderCards.bind(this)}
            sliderWidth={380}
            itemWidth={300}
            style={{ marginTop: 200 }}
            lockScrollWhileSnapping
          />
        </GSAnimatable>
      </GSContainer>
    )
  }
}

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  sourceLanguage: getSourceLanguage(state),
  targetLanguage: getTargetLanguage(state),
  getLessons: (skillId: string) => getSkillLessons(skillId)(state),
  profile: state.profile,
  loading: state.api.loading,
})

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  enterLesson: (lessonId: string) => dispatch(enterLesson(lessonId)),
  previewLesson: (lessonId: string) => dispatch(overviewLesson(lessonId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Lessons)
