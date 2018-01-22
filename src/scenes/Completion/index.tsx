import React from 'react';
import { connect } from 'react-redux';
import {
  NavigationActions,
  NavigationResetActionPayload,
} from 'react-navigation';
import I18n from 'I18n';
import config from 'config/';
import { finishLesson } from 'services/progress/actions';
import { ILesson, ISkill } from 'services/skills';
import { GSContainer, GSCongratMessage, GSXPGain, GSNextButton } from './index.styles';
import { IInitialState } from 'services/reducers';
import {
  getLessonInProgress,
  getActiveCourse,
  getSkillInProgress,
  isRegistered,
} from 'services/selectors';
import { resetToLessons, resetToSignon } from 'helpers/navigation';
import NextButton from 'components/NextButton';
import { ICourse } from 'services/courses';

interface IProps {
  navigationReset: (reset: NavigationResetActionPayload) => void;
  finishLesson?: (lessonXP: number) => void;
  lessonInProgress: ILesson;
  activeCourse: ICourse;
  skillInProgress: ISkill;
  isRegistered: boolean;
}

interface IState {
  timeToSkipAdd: number;
}

const decreaseIntervals = 1000;

class Completion extends React.Component<IProps, IState> {

  state = {
    timeToSkipAdd: 0,
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

  navToSignon = () => {
    this.props.navigationReset(resetToSignon());
  }

  renderBackToLessonsButton = () => {
    const seconds = this.state.timeToSkipAdd / 1000;
    const buttonName = this.canSkipAdd()
      ? I18n.t('completion.backToLessons')
      : I18n.t('completion.willAllowToGoInSeconds', { seconds });

    return <NextButton onPress={this.navBackToLessons}
      disabled={!this.canSkipAdd()}
      text={buttonName} />;
  }

  renderSignupOrLoginButton = () => {
    return <NextButton onPress={this.navToSignon}
      disabled={false}
      text={I18n.t('profile.signonToSave')}
      restProps={{ primary: true, wide: true }}
    />;
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
        <GSNextButton>
          {this.renderBackToLessonsButton()}
          {this.props.isRegistered ||
            this.renderSignupOrLoginButton()}
        </GSNextButton>

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
  isRegistered: isRegistered(state),
});

export default connect(mapStateToDispatch, mapDispatchToProps)(Completion);
