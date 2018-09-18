import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { isRegistered } from 'services/selectors';
import { IInitialState } from 'services/reducers';
import { Hamburger, FBLoginButton } from 'components';
import { Dispatch } from 'redux';
import I18n from 'I18n';
import * as profile from 'services/profile';
import * as leaderboard from 'services/leaderboard';
import * as signon from 'services/signon';
import * as api from 'services/api/reducers';
import { GSCustomText } from 'styles/text';
import { NavigationScreenProp } from 'react-navigation';

import { GSContainer, GSProfile, GSProfileDetails, GSProfileDetailsItem, GSProfilePicture } from './index.styles';
import VersionNumber from 'react-native-version-number';
import { GSDrawerLabel } from 'scenes/Drawer';
import Images from 'assets/images';

export interface IProps {
  apiStatus: api.IApiStatus;
  profile: profile.IProfile;
  signout: () => void;
  isRegistered: boolean;
  navigation: NavigationScreenProp<any, any>;
  fetchLeaderboard: () => void;
  currentUserCourseXpRatio: number;
}

class Profile extends React.Component<IProps> {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: I18n.t('profile.title'),
    headerLeft: <Hamburger onPress={() => navigate('DrawerOpen')} />,
    drawerLabel: <GSDrawerLabel>{I18n.t('profile.title')}</GSDrawerLabel>,
    headerRight: null
  });

  componentDidMount() {
    if (!this.props.isRegistered) {
      this.props.navigation.navigate('Signon');
    } else {
      this.props.fetchLeaderboard();
    }
  }

  renderProfile = () => {
    const { profilePic } = this.props.profile;

    return (
      <GSProfile>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Leaderboard')}>
          <GSProfilePicture source={profilePic ? { uri: profilePic } : Images.profile.default} />
        </TouchableOpacity>
        <GSProfileDetails>
          <GSProfileDetailsItem>{I18n.t('profile.details.name')}:</GSProfileDetailsItem>
          <GSCustomText>{this.props.profile.name}</GSCustomText>
        </GSProfileDetails>
        <GSProfileDetails>
          <GSProfileDetailsItem>{I18n.t('profile.details.email')}:</GSProfileDetailsItem>
          <GSCustomText>{this.props.profile.email}</GSCustomText>
        </GSProfileDetails>
        <GSProfileDetails>
          <GSProfileDetailsItem>{I18n.t('profile.details.userXp')}:</GSProfileDetailsItem>
          <GSCustomText>{this.props.profile.userXp}</GSCustomText>
        </GSProfileDetails>
        <GSProfileDetails>
          <GSProfileDetailsItem>{I18n.t('profile.details.appVersion')}:</GSProfileDetailsItem>
          <GSCustomText>{VersionNumber.appVersion}</GSCustomText>
        </GSProfileDetails>

        {this.props.profile.hasConnectedViaFacebook || <FBLoginButton signon="connect" />}
      </GSProfile>
    );
  };

  render() {
    return <GSContainer>{this.props.isRegistered && this.renderProfile()}</GSContainer>;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  signout: () => dispatch(signon.actions.signout()),
  fetchLeaderboard: () => dispatch(leaderboard.actions.fetchLeaderboard())
});

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  apiStatus: state.api,
  profile: state.profile,
  isRegistered: isRegistered(state),
  currentUserCourseXpRatio: state.leaderboard.currentUserCourseXpRatio
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
