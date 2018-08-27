import * as React from 'react';
import { connect } from 'react-redux';
import { NavigationActions, NavigationResetActionPayload } from 'react-navigation';
import I18n from 'I18n';
import { ILesson, ISkill, ILessonHistory } from 'services/skills';
import { GSContainer, GSCongratMessage, GSXPGain, GSNextButton } from './index.styles';
import { IInitialState } from 'services/reducers';
import { getLessonInProgress, getSkillInProgress, isRegistered, getSourceLanguage } from 'services/selectors';
import config from 'config/';
import { resetToLessons, resetToSkills } from 'helpers/navigation';
import { NextButton, SignOnOrOut } from 'components/';
import { IProfile } from 'services/profile';
import { Dispatch } from 'redux';

interface IProps {
  navigationReset: (reset: NavigationResetActionPayload) => void;
  lessonInProgress: ILesson;
  profile: IProfile;
  skillInProgress: ISkill;
  isRegistered: boolean;
  sourceLanguage: TLangs;
}

interface IState {
  timeToSkipAd: number;
  lessonXp: number;
}

const decreaseIntervals = 1000;

class Completion extends React.Component<IProps, IState> {
  state = {
    timeToSkipAd: 0,
    lessonXp: config.lessonXP
  };

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    const lastAccomplishment: ILessonHistory = this.props.lessonInProgress.lessonHistory.slice(-1)[0];

    if (lastAccomplishment) {
      this.setState({ lessonXp: lastAccomplishment.thisLessonXp });
    }

    this.countDown();
  }

  countDown = () => {
    setTimeout(() => {
      const decreasedTime = this.state.timeToSkipAd - decreaseIntervals;
      this.setState({ timeToSkipAd: decreasedTime }, () => {
        if (!this.canSkipAd()) {
          this.countDown();
        }
      });
    }, decreaseIntervals);
  };

  canSkipAd = () => this.state.timeToSkipAd <= 0;

  navBackToLessons = () => {
    const { navigationReset, skillInProgress } = this.props;
    navigationReset(skillInProgress.progress === 1 ? resetToSkills() : resetToLessons(skillInProgress));
  };

  renderBackToLessonsButton = () => {
    const seconds = this.state.timeToSkipAd / 1000;
    const buttonName = this.canSkipAd()
      ? I18n.t('completion.backToLessons')
      : I18n.t('completion.willAllowToGoInSeconds', { seconds });

    return (
      <NextButton
        onPress={this.navBackToLessons}
        disabled={!this.canSkipAd()}
        lang={this.props.sourceLanguage}
        text={buttonName}
      />
    );
  };

  render() {
    const { order } = this.props.lessonInProgress;

    return (
      <GSContainer>
        <GSCongratMessage>{I18n.t('completion.congratulations', { order })}</GSCongratMessage>
        <GSXPGain>{I18n.t('completion.xpGain', { xp: this.state.lessonXp })}</GSXPGain>
        <GSNextButton>
          {this.renderBackToLessonsButton()}
          {this.props.isRegistered || <SignOnOrOut />}
        </GSNextButton>
      </GSContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  navigationReset: (reset: NavigationResetActionPayload) => dispatch(NavigationActions.reset(reset))
});

const mapStateToDispatch = (state: IInitialState): Partial<IProps> => ({
  sourceLanguage: getSourceLanguage(state),
  profile: state.profile,
  lessonInProgress: getLessonInProgress(state),
  skillInProgress: getSkillInProgress(state),
  isRegistered: isRegistered(state)
});

export default connect(
  mapStateToDispatch,
  mapDispatchToProps
)(Completion);
