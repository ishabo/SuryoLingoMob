import * as React from 'react';
import { Dispatch } from 'redux';
import I18n from '@sl/i18n';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { isRegistered } from '@sl/services/selectors';
import { IInitialState } from '@sl/services/reducers';
import {
  Hamburger,
  FBLoginButton,
  DrawerItem,
  SignOnOrOut,
} from '@sl/components';
import {
  GSContainer,
  GSProfile,
  GSProfileDetails,
  GSProfileDetailsItem,
  GSProfilePicture,
  GSPersonalDetails,
  GSBottom,
} from './index.styles';
import * as profile from '@sl/services/profile';
import * as courses from '@sl/services/courses';
import * as leaderboard from '@sl/services/leaderboard';
import * as signon from '@sl/services/signon';
import * as api from '@sl/services/api/reducers';
import { GSCustomText } from '@sl/styles/text';
import { NavigationScreenProp } from 'react-navigation';
import VersionNumber from 'react-native-version-number';
import Images from '@sl/assets/images';
import { Analytics } from '@sl/config/firebase';
import { showAlert } from '@sl/helpers';

export interface IProps {
  apiStatus: api.IApiStatus;
  profile: profile.IProfile;
  signout: () => void;
  isRegistered: boolean;
  navigation: NavigationScreenProp<any, any>;
  fetchLeaderboard: () => void;
  fetchProfile: () => void;
  currentUserCourseXpRatio: number;
  courses: courses.ICourse[];
  fetchCourses: () => void;
  signon: signon.ISignonState;
}

class Profile extends React.Component<IProps> {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: I18n.t('profile.title'),
    headerLeft: <Hamburger onPress={() => navigate('DrawerOpen')} />,
    drawerLabel: <DrawerItem label={I18n.t('profile.title')} icon="profile" />,
    headerRight: null,
  })

  componentDidMount() {
    Analytics.setCurrentScreen(this.constructor.name);
    if (!this.props.isRegistered) {
      this.props.navigation.navigate('Signon');
    } else {
      this.props.fetchProfile();
      this.props.fetchLeaderboard();
      this.props.fetchCourses();
    }
  }

  componentDidUpdate(prevProps: Partial<IProps>) {
    if (this.props.signon.errors !== prevProps.signon.errors) {
      if (this.props.signon.errors.facebook) {
        showAlert('signon', this.props.signon.errors.facebook);
      }
    }
  }

  returnUserCourse = () => {
    return this.props.courses.map(course => (
      <GSProfileDetails key={course.id}>
        <GSProfileDetailsItem>
          {course.targetLanguage.fullName}:
        </GSProfileDetailsItem>
        <GSCustomText>{course.courseXp}</GSCustomText>
      </GSProfileDetails>
    ));
  }

  renderProfile = () => {
    const { profilePic } = this.props.profile;

    return (
      <GSProfile>
        <>
          <GSPersonalDetails>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Leaderboard')}
            >
              <GSProfilePicture
                source={
                  profilePic ? { uri: profilePic } : Images.profile.default
                }
              />
            </TouchableOpacity>
            <GSProfileDetails>
              <GSProfileDetailsItem>
                {I18n.t('profile.details.name')}:
              </GSProfileDetailsItem>
              <GSCustomText>{this.props.profile.name}</GSCustomText>
            </GSProfileDetails>
            <GSProfileDetails>
              <GSProfileDetailsItem>
                {I18n.t('profile.details.email')}:
              </GSProfileDetailsItem>
              <GSCustomText>{this.props.profile.email}</GSCustomText>
            </GSProfileDetails>

            {this.returnUserCourse()}
            <GSProfileDetails>
              <GSProfileDetailsItem>
                {I18n.t('profile.details.appVersion')}:
              </GSProfileDetailsItem>
              <GSCustomText>{VersionNumber.appVersion}</GSCustomText>
            </GSProfileDetails>
          </GSPersonalDetails>
          <GSBottom>
            {this.props.profile.hasConnectedViaFacebook || (
              <FBLoginButton signon="connect" />
            )}
            <SignOnOrOut lang={'cl-ara'} isLoggedIn />
          </GSBottom>
        </>
      </GSProfile>
    );
  }

  render() {
    return (
      <GSContainer>
        {this.props.isRegistered && this.renderProfile()}
      </GSContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  signout: () => dispatch(signon.actions.signout()),
  fetchLeaderboard: () => dispatch(leaderboard.actions.fetchLeaderboard()),
  fetchProfile: () => dispatch(profile.actions.fetchProfile()),
  fetchCourses: () => dispatch(courses.actions.fetchCourses()),
});

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  apiStatus: state.api,
  profile: state.profile,
  courses: state.courses,
  isRegistered: isRegistered(state),
  signon: state.signon,
  currentUserCourseXpRatio: state.leaderboard.currentUserCourseXpRatio,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
