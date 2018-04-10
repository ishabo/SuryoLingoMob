import * as React from 'react';
import { connect } from 'react-redux';
import { isRegistered } from 'services/selectors';
import { IInitialState } from 'services/reducers';
import { Hamburger } from 'components';
import { Dispatch } from 'redux';
import I18n from 'I18n';
import * as profile from 'services/profile';
import * as signon from 'services/signon';
import * as api from 'services/api/reducers';
import { GSCustomText } from 'styles/text';
import { NavigationScreenProp } from 'react-navigation';
import images from 'assets/images';
import {
  GSContainer, GSProfilePictureFrame,
  GSProfile, GSProfileDetails, GSProfileDetailsItem,
  GSProfilePicture,
} from './index.styles';
import VersionNumber from 'react-native-version-number';
import { GSDrawerLabel } from 'scenes/Drawer';

export interface IProps {
  apiStatus: api.IApiStatus;
  profile: profile.IProfile;
  signout: () => void;
  isRegistered: boolean;
  navigation: NavigationScreenProp<any, any>;
}

class Profile extends React.Component<IProps> {

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: I18n.t('profile.title'),
    headerLeft: <Hamburger onPress={() => navigate('DrawerOpen')} />,
    drawerLabel: <GSDrawerLabel>{I18n.t('profile.title')}</GSDrawerLabel>,
    headerRight: null,
  });

  componentWillMount () {
    if (!this.props.isRegistered) {
      this.props.navigation.navigate('Signon');
    }
  }

  renderProfile = () => {
    return (
      <GSProfile>
        <GSProfilePictureFrame outer>
          <GSProfilePictureFrame inner>
            <GSProfilePicture source={images.logo.splash} />
          </GSProfilePictureFrame>
        </GSProfilePictureFrame>
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
      </GSProfile>
    )
  }

  render () {
    return (
      <GSContainer>
        {this.props.isRegistered && this.renderProfile()}
      </GSContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  signout: () => dispatch(signon.actions.signout()),
});

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  apiStatus: state.api,
  profile: state.profile,
  isRegistered: isRegistered(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
