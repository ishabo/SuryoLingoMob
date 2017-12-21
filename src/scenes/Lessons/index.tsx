import React from 'react';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import I18n from '../../i18n';
import * as Animatable from 'react-native-animatable';
import { ISkill, ILesson } from '../../services/skills/reducers';
import { enterLesson } from '../../services/progress/actions';
import { IInitialState } from '../../services/reducers';
import { getSkillLessons } from '../../services/selectors';
import Lesson from './components/Lesson';
import { SkillIcon } from '../Skills/components';
import glamor from 'glamorous-native';

class Lessons extends React.Component<any, any> {

  private carousal: any;
  private cards: any;

  static navigationOptions = ({ navigation }) => ({
    title: I18n.t('lessons.title', { skill: navigation.state.params.skill.name }),
  })

  private getNumOfActiveLessons = (): number => {
    return this.props.getLessons(this.getSkill().id).filter((lesson: ILesson) =>
      lesson.finished).length;
  }

  private getSkill = () => this.props.navigation.state.params.skill;
  private totalLessons = () => this.getSkill().lessons.length;

  componentDidMount () {
    this.cards.fadeInUp();
    console.log('Completion');
    setInterval(this.snapToActive, 500);
  }

  private snapToActive = () => {
    if (this.carousal && this.carousal.currentIndex === 0) {
      const itemIndex = this.getNumOfActiveLessons() === this.totalLessons()
        ? this.totalLessons() - 1
        : this.getNumOfActiveLessons();
      this.carousal.snapToItem(itemIndex);
    }
  }

  private isLessonActive = (index: number): boolean => {
    return index <= this.getNumOfActiveLessons();
  }

  renderCards ({ item: lesson, index }) {
    return <Lesson
      skill={this.props.navigation.state.params.skill}
      lesson={lesson}
      active={this.isLessonActive(index)}
      enterLesson={this.props.enterLesson}
    />;
  }

  render () {
    const skill: ISkill = this.props.navigation.state.params.skill;
    return (
      <GSContainer>
        <GSLessonIcon>
          <SkillIcon
            icon={this.props.navigation.state.params.skill.icons.xxxhdpi.locked}
            size={150} />
        </GSLessonIcon>
        <GSLessonInstruction>
          <Text>{I18n.t('lessons.instruction')}</Text>
        </GSLessonInstruction>
        <GSAnimatable
          innerRef={(c: Lessons) => this.cards = c} >
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

const GSContainer = glamor(Container)({
  alignItems: 'center',
  alignSelf: 'stretch',
  justifyContent: 'space-between',
});

const GSLessonIcon = glamor.view({
  position: 'absolute',
  top: 10,
  width: 150,
});

const GSLessonInstruction = glamor.view({
  justifyContent: 'center',
  alignSelf: 'center',
  marginTop: 150,
  marginBottom: 20,
});

const GSAnimatable = glamor(Animatable.View)({
  flex: 2,
  alignSelf: 'center',
  justifyContent: 'center',
});

const mapStateToProps = (state: IInitialState) => ({
  courses: state.courses,
  getLessons: (skillId: string) => getSkillLessons(skillId)(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  enterLesson: (lessonId: string) => dispatch(enterLesson(lessonId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);
