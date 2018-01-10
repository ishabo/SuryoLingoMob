import React from 'react';
import {
  NavigationActions,
  NavigationResetActionPayload,
} from 'react-navigation';
import I18n from 'I18n';
import config from 'config/';
import { connect } from 'react-redux';
import { finishLesson } from 'services/progress/actions';
import { ILesson, ISkill } from 'services/skills';
import { GSContainer, GSCongratMessage, GSXPGain } from './index.styles';
import { IInitialState } from 'services/reducers';
import { getLessonInProgress, getActiveCourse, getSkillInProgress } from 'services/selectors';
import { resetToLessons } from 'helpers/navigation';
import NextButton from 'components/NextButton';
import { ICourse } from 'services/courses';

interface IProps {
  navigationReset: (reset: NavigationResetActionPayload) => void;
  finishLesson?: (lessonXP: number) => void;
  lessonInProgress: ILesson;
  activeCourse: ICourse;
  skillInProgress: ISkill;
}

interface IState {
  timeToSkipAdd: number;
}

const decreaseIntervals = 1000;

class Completion extends React.Component<IProps, IState> {

  state = {
    timeToSkipAdd: 3000,
  };

  static navigationOptions = {
    header: null,
  };

  componentDidMount () {
    setTimeout(() => this.props.finishLesson(config.lessonXP), 200);
    this.countDown();
  }

  countDown = () => {
    setTimeout(() => {
      const decreasedTime = this.state.timeToSkipAdd - decreaseIntervals;
      this.setState({ timeToSkipAdd: decreasedTime }, () => {
        if (!this.canSkipAdd()) {
          this.countDown();
        }
      });
    }, decreaseIntervals);
  }

  canSkipAdd = () =>
    this.state.timeToSkipAdd <= 0

  navBackToLessons = () => {
    const { navigationReset, activeCourse, skillInProgress } = this.props;
    navigationReset(resetToLessons(activeCourse, skillInProgress));
  }

  renderNextButton = () => {
    const seconds = this.state.timeToSkipAdd / 1000;
    const buttonName = this.canSkipAdd()
      ? I18n.t('completion.backToLessons')
      : I18n.t('completion.willAllowToGoInSeconds', { seconds });
    return <NextButton onPress={this.navBackToLessons}
      disabled={!this.canSkipAdd()}
      text={buttonName} />;
  }

  render () {
    const { order } = this.props.lessonInProgress;
    return (
      <GSContainer>
        <GSCongratMessage>
          {I18n.t('completion.congratulations', { order })}
        </GSCongratMessage>
        <GSXPGain>
          {I18n.t('completion.xpGain', { xp: '10' })}
        </GSXPGain>
        {this.renderNextButton()}
      </GSContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  finishLesson: (lessonXP: number) =>
    dispatch(finishLesson(lessonXP)),
  navigationReset: (reset: NavigationResetActionPayload) =>
    dispatch(NavigationActions.reset(reset)),
});

const mapStateToDispatch = (state: IInitialState) => ({
  lessonInProgress: getLessonInProgress(state),
  activeCourse: getActiveCourse(state),
  skillInProgress: getSkillInProgress(state),
});

export default connect(mapStateToDispatch, mapDispatchToProps)(Completion);
