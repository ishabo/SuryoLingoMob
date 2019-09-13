import * as React from 'react';
import I18n from 'I18n';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { isRegistered } from 'services/selectors';
import { Hamburger, FBLoginButton, DrawerItem, SignOnOrOut } from 'components';
import { GSContainer, GSProfile, GSProfileDetails, GSProfileDetailsItem, GSProfilePicture, GSPersonalDetails, GSBottom } from './index.styles';
import * as profile from 'services/profile';
import * as courses from 'services/courses';
import * as leaderboard from 'services/leaderboard';
import * as signon from 'services/signon';
import { GSCustomText } from 'styles/text';
import VersionNumber from 'react-native-version-number';
import Images from 'assets/images';
import { Analytics } from 'config/firebase';
import { showAlert } from 'helpers';
class Profile extends React.Component {
    constructor() {
        super(...arguments);
        this.returnUserCourse = () => {
            return this.props.courses.map(course => (React.createElement(GSProfileDetails, { key: course.id },
                React.createElement(GSProfileDetailsItem, null,
                    course.targetLanguage.fullName,
                    ":"),
                React.createElement(GSCustomText, null, course.courseXp))));
        };
        this.renderProfile = () => {
            const { profilePic } = this.props.profile;
            return (React.createElement(GSProfile, null,
                React.createElement(React.Fragment, null,
                    React.createElement(GSPersonalDetails, null,
                        React.createElement(TouchableOpacity, { onPress: () => this.props.navigation.navigate('Leaderboard') },
                            React.createElement(GSProfilePicture, { source: profilePic ? { uri: profilePic } : Images.profile.default })),
                        React.createElement(GSProfileDetails, null,
                            React.createElement(GSProfileDetailsItem, null,
                                I18n.t('profile.details.name'),
                                ":"),
                            React.createElement(GSCustomText, null, this.props.profile.name)),
                        React.createElement(GSProfileDetails, null,
                            React.createElement(GSProfileDetailsItem, null,
                                I18n.t('profile.details.email'),
                                ":"),
                            React.createElement(GSCustomText, null, this.props.profile.email)),
                        this.returnUserCourse(),
                        React.createElement(GSProfileDetails, null,
                            React.createElement(GSProfileDetailsItem, null,
                                I18n.t('profile.details.appVersion'),
                                ":"),
                            React.createElement(GSCustomText, null, VersionNumber.appVersion))),
                    React.createElement(GSBottom, null,
                        this.props.profile.hasConnectedViaFacebook || React.createElement(FBLoginButton, { signon: "connect" }),
                        React.createElement(SignOnOrOut, { lang: 'cl-ara', isLoggedIn: true })))));
        };
    }
    componentDidMount() {
        Analytics.setCurrentScreen(this.constructor.name);
        if (!this.props.isRegistered) {
            this.props.navigation.navigate('Signon');
        }
        else {
            this.props.fetchProfile();
            this.props.fetchLeaderboard();
            this.props.fetchCourses();
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.signon.errors !== prevProps.signon.errors) {
            if (this.props.signon.errors.facebook) {
                showAlert('signon', this.props.signon.errors.facebook);
            }
        }
    }
    render() {
        return React.createElement(GSContainer, null, this.props.isRegistered && this.renderProfile());
    }
}
Profile.navigationOptions = ({ navigation: { navigate } }) => ({
    title: I18n.t('profile.title'),
    headerLeft: React.createElement(Hamburger, { onPress: () => navigate('DrawerOpen') }),
    drawerLabel: React.createElement(DrawerItem, { label: I18n.t('profile.title'), icon: "profile" }),
    headerRight: null
});
const mapDispatchToProps = (dispatch) => ({
    signout: () => dispatch(signon.actions.signout()),
    fetchLeaderboard: () => dispatch(leaderboard.actions.fetchLeaderboard()),
    fetchProfile: () => dispatch(profile.actions.fetchProfile()),
    fetchCourses: () => dispatch(courses.actions.fetchCourses())
});
const mapStateToProps = (state) => ({
    apiStatus: state.api,
    profile: state.profile,
    courses: state.courses,
    isRegistered: isRegistered(state),
    signon: state.signon,
    currentUserCourseXpRatio: state.leaderboard.currentUserCourseXpRatio
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
//# sourceMappingURL=index.js.map