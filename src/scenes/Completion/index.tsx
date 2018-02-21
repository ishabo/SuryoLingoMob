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
  getSkillInProgress,
  isRegistered,
  getLearnersLanguage,
} from 'services/selectors';
import { resetToLessons, resetToSkills } from 'helpers/navigation';
import { NextButton, SignonButton } from 'components/';
import { IProfile } from 'services/profile';

interface IProps {
  navigationReset: (reset: NavigationResetActionPayload) => void;
  finishLesson?: (lessonXP: number) => void;
  lessonInProgress: ILesson;
  profile: IProfile;
  skillInProgress: ISkill;
  isRegistered: boolean;
  learnersLanguage: TLangs;
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
    const { navigationReset, skillInProgress, profile } = this.props;
    navigationReset(skillInProgress.progress === 1
      ? resetToSkills(profile)
      : resetToLessons(profile, skillInProgress),
    );
  }

  renderBackToLessonsButton = () => {
    const seconds = this.state.timeToSkipAdd / 1000;
    const buttonName = this.canSkipAdd()
      ? I18n.t('completion.backToLessons')
      : I18n.t('completion.willAllowToGoInSeconds', { seconds });

    return <NextButton onPress={this.navBackToLessons}
      disabled={!this.canSkipAdd()}
      lang={this.props.learnersLanguage}
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
          {I18n.t('completion.xpGain', { xp: config.lessonXP })}
        </GSXPGain>
        <GSNextButton>
          {this.renderBackToLessonsButton()}
          {this.props.isRegistered ||
            <SignonButton />}
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
  learnersLanguage: getLearnersLanguage(state),
  profile: state.profile,
  lessonInProgress: getLessonInProgress(state),
  skillInProgress: getSkillInProgress(state),
  isRegistered: isRegistered(state),
});

export default connect(mapStateToDispatch, mapDispatchToProps)(Completion);
