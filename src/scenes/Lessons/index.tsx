import * as React from 'react';
import { Container } from 'native-base';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import I18n from 'I18n';
import * as Animatable from 'react-native-animatable';
import { ISkill, ILesson } from 'services/skills';
import { enterLesson } from 'services/progress/actions';
import { IInitialState } from 'services/reducers';
import { getSkillLessons, getLearnersLanguage, getTargetLanguage } from 'services/selectors';
import Lesson from './components/Lesson';
import { SkillIcon } from '../Skills/components';
import glamor from 'glamorous-native';
import { NavigationScreenProp } from 'react-navigation';
import { GSCustomText } from 'styles/text';
import { IProfile } from 'services/profile';

interface IProps {
  getLessons (skillId: string): ILesson[];
  enterLesson (): void;
  navigation: NavigationScreenProp<any, any>;
  learnersLanguage: TLangs;
  targetLanguage: TLangs;
  profile: IProfile;
}

interface IState {
  snapped: boolean;
}

class Lessons extends React.Component<IProps, IState> {

  state = {
    snapped: false,
  };

  private carousal: any;
  private cards: any;

  static navigationOptions = ({ navigation }) => ({
    title: I18n.t('lessons.title', { skill: navigation.state.params.skill.name }),
    headerBackTitle: '',
  })

  private getNumOfActiveLessons = (): number => this.getFinishedLesson().length;

  private getFinishedLesson = (): ILesson[] =>
    this.props.getLessons(this.getSkill().id).filter((lesson: ILesson) =>
      lesson.finished)

  private getSkill = () => this.props.navigation.state.params.skill;
  private totalLessons = () => this.getSkill().lessons.length;

  componentDidMount () {
    if (this.state.snapped === false) {
      this.cards.fadeInUp();
      setTimeout(this.snapToItem, 800);
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  }

  private snapToItem = () => {
    if (this.carousal) {
      this.setState({ snapped: true }, () => {
        const itemIndex = this.getNumOfActiveLessons() === this.totalLessons()
          ? this.totalLessons() - 1
          : this.getNumOfActiveLessons();

        this.carousal.snapToItem(itemIndex);
      });
    }
  }

  private isLessonActive = (lesson: ILesson): boolean => {
    if (this.props.profile.isTester) {
      return true;
    }
    if (lesson.finished || lesson.order === 1) {
      return true;
    } else {
      const previousOrder = this.getFinishedLesson().find(
        (l: ILesson) => l.order === (lesson.order - 1));
      return previousOrder && previousOrder.finished;
    }
  }

  private renderCards ({ item: lesson, _ }) {
    return <Lesson
      skill={this.props.navigation.state.params.skill}
      lesson={lesson}
      active={this.isLessonActive(lesson)}
      enterLesson={this.props.enterLesson}
      targetLanguage={this.props.targetLanguage}
      learnersLanguage={this.props.learnersLanguage}
    />;
  }

  render () {
    const skill: ISkill = this.props.navigation.state.params.skill;
    return (
      <GSContainer>
        <GSLessonIcon>
          <SkillIcon
            icon={this.props.navigation.state.params.skill.icon}
            state="unlocked"
            size="xxxhdpi" />
        </GSLessonIcon>
        <GSLessonInstruction>
          <GSCustomText lang={this.props.learnersLanguage}>{I18n.t('lessons.instruction')}</GSCustomText>
        </GSLessonInstruction>
        <GSAnimatable
          innerRef={(c: Lessons) => this.cards = c}>
          <Carousel
            ref={(c: Lessons) => this.carousal = c}
            data={this.props.getLessons(skill.id)}
            renderItem={this.renderCards.bind(this)}
            sliderWidth={380}
            itemWidth={300}
            style={{ marginTop: 200 }}
            lockScrollWhileSnapping
          />
        </GSAnimatable>
      </GSContainer>
    );
  }
}

const GSContainer: any = glamor(Container)({
  alignItems: 'center',
  alignSelf: 'stretch',
  justifyContent: 'space-between',
});

const GSLessonIcon: any = glamor.view({
  position: 'absolute',
  top: 10,
  width: 150,
});

const GSLessonInstruction: any = glamor.view({
  justifyContent: 'center',
  alignSelf: 'center',
  marginTop: 150,
  marginBottom: 20,
});

const GSAnimatable: any = glamor(Animatable.View)({
  alignSelf: 'center',
  justifyContent: 'center',
});

const mapStateToProps = (state: IInitialState) => ({
  learnersLanguage: getLearnersLanguage(state),
  targetLanguage: getTargetLanguage(state),
  getLessons: (skillId: string) => getSkillLessons(skillId)(state),
  profile: state.profile,
});

const mapDispatchToProps = (dispatch: any) => ({
  enterLesson: (lessonId: string) => dispatch(enterLesson(lessonId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);
