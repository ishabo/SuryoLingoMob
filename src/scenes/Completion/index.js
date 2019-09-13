import * as React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import I18n from 'I18n';
import { GSContainer, GSCongratMessage, GSXPGain, GSNextButton } from './index.styles';
import { getLessonInProgress, getSkillInProgress, isRegistered, getSourceLanguage } from 'services/selectors';
import config from 'config/';
import { resetToLessons, resetToSkills } from 'helpers/navigation';
import { NextButton, SignOnOrOut } from 'components/';
// import { displayInterstitialAd } from 'helpers';
import { Analytics } from 'config/firebase';
class Completion extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            timeToSkipAd: 0,
            lessonXp: config.lessonXP
        };
        this.navBackToLessons = () => {
            const { navigationReset, skillInProgress } = this.props;
            navigationReset(skillInProgress.progress === 1 ? resetToSkills() : resetToLessons(skillInProgress));
        };
        this.renderBackToLessonsButton = () => (React.createElement(NextButton, { onPress: this.navBackToLessons, lang: this.props.sourceLanguage, text: I18n.t('completion.backToLessons') }));
    }
    componentDidMount() {
        Analytics.setCurrentScreen(this.constructor.name);
        const lastAccomplishment = this.props.lessonInProgress.lessonHistory.slice(-1)[0];
        if (lastAccomplishment) {
            this.setState({ lessonXp: lastAccomplishment.thisLessonXp });
        }
        // displayInterstitialAd('completion');
    }
    render() {
        const { order } = this.props.lessonInProgress;
        return (React.createElement(GSContainer, null,
            React.createElement(GSCongratMessage, null, I18n.t('completion.congratulations', { order })),
            React.createElement(GSXPGain, null, I18n.t('completion.xpGain', { xp: this.state.lessonXp })),
            React.createElement(GSNextButton, null,
                this.renderBackToLessonsButton(),
                this.props.isRegistered || React.createElement(SignOnOrOut, null))));
    }
}
Completion.navigationOptions = {
    header: null
};
const mapDispatchToProps = (dispatch) => ({
    navigationReset: (reset) => dispatch(NavigationActions.reset(reset))
});
const mapStateToDispatch = (state) => ({
    sourceLanguage: getSourceLanguage(state),
    profile: state.profile,
    lessonInProgress: getLessonInProgress(state),
    skillInProgress: getSkillInProgress(state),
    isRegistered: isRegistered(state)
});
export default connect(mapStateToDispatch, mapDispatchToProps)(Completion);
//# sourceMappingURL=index.js.map