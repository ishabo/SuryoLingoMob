import * as React from 'react';
import { connect } from 'react-redux';
import { Hamburger, DrawerItem } from 'components';
import I18n from 'I18n';
import * as leaderboard from 'services/leaderboard';
import { isUserInLeaderboard } from 'services/selectors';
import images from 'assets/images';
import { Analytics } from 'config/firebase';
import { GSContainer, GSTopUsers, GSCurrentUserPosition, GSTopUser, GSUserDetails, GSUserName, GSUserXP, GSUserProfilePicture, GSGap, GSRank } from './index.styles';
import { getWindowWidth } from 'helpers';
import { GSCustomText } from 'styles/text';
import { Text } from 'react-native-animatable';
class Leaderboard extends React.Component {
    constructor() {
        super(...arguments);
        this.renderUser = (user, rank) => (React.createElement(GSTopUser, { key: user.id, highlight: user.id === this.props.profile.id },
            React.createElement(GSRank, null,
                React.createElement(Text, { animation: "pulse", easing: "ease-out", iterationCount: 1 }, rank)),
            React.createElement(GSUserDetails, { align: "right" },
                React.createElement(GSUserProfilePicture, { source: this.renderProfilePicture(user.profilePic) })),
            React.createElement(GSUserDetails, { align: "stretch" },
                React.createElement(GSUserName, null, user.name ? user.name.split(' ')[0] : I18n.t('profile.me'))),
            React.createElement(GSUserDetails, { align: "center" },
                React.createElement(GSUserXP, null, user.userXp))));
        this.renderProfilePicture = (profilePic) => {
            return profilePic ? { uri: profilePic } : images.profile.default;
        };
        this.renderLeaderboard = () => this.props.topUsers.map((user, index) => this.renderUser(user, index + 1));
        this.renderUserPosition = () => {
            const { profile } = this.props;
            const { id, name, userXp } = profile;
            const ratio = this.props.currentUserCourseXpRatio;
            return this.renderUser({ id, name, userXp, ratio }, this.props.currentUserPosition);
        };
    }
    componentDidMount() {
        Analytics.setCurrentScreen(this.constructor.name);
        this.props.fetchLeaderboard();
    }
    render() {
        return (React.createElement(GSContainer, null,
            React.createElement(GSTopUsers, { contentContainerStyle: {
                    alignItems: 'stretch',
                    width: getWindowWidth()
                } },
                this.renderLeaderboard(),
                this.props.isUserInLeaderboard || (React.createElement(GSCurrentUserPosition, null,
                    React.createElement(GSGap, null,
                        React.createElement(GSCustomText, { style: { alignSelf: 'center', fontSize: 30 } }, "...")),
                    this.renderUserPosition())))));
    }
}
Leaderboard.navigationOptions = ({ navigation: { navigate } }) => ({
    title: I18n.t('leaderboard.title'),
    headerLeft: React.createElement(Hamburger, { onPress: () => navigate('DrawerOpen') }),
    drawerLabel: React.createElement(DrawerItem, { label: I18n.t('leaderboard.title'), icon: "leaderboard" }),
    headerRight: null
});
const mapDispatchToProps = (dispatch) => ({
    fetchLeaderboard: () => dispatch(leaderboard.actions.fetchLeaderboard())
});
const mapStateToProps = (state) => ({
    isUserInLeaderboard: isUserInLeaderboard(state),
    topUsers: state.leaderboard.topUsers,
    currentUserPosition: state.leaderboard.currentUserPosition,
    currentUserCourseXpRatio: state.leaderboard.currentUserCourseXpRatio,
    profile: state.profile
});
export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
//# sourceMappingURL=index.js.map