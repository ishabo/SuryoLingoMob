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
import { displayInterstitialAd } from 'helpers';

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

    displayInterstitialAd('completion');
  }

  navBackToLessons = () => {
    const { navigationReset, skillInProgress } = this.props;
    navigationReset(skillInProgress.progress === 1 ? resetToSkills() : resetToLessons(skillInProgress));
  };

  renderBackToLessonsButton = () => (
    <NextButton
      onPress={this.navBackToLessons}
      lang={this.props.sourceLanguage}
      text={I18n.t('completion.backToLessons')}
    />
  );

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
