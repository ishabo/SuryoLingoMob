import React from 'react';
import { connect } from 'react-redux';
import { GSContainer } from './index.styles';
import { SignonButton, SignoutButton } from 'components';
import { isRegistered } from 'services/selectors';
import { IInitialState } from 'services/reducers';
import { Dispatch } from 'redux';
import I18n from 'I18n';
import * as profile from 'services/profile';
import * as signon from 'services/signon';
import * as api from 'services/api/reducers';
import { Icon } from 'native-base';

export interface IProps {
  apiStatus: api.IApiStatus;
  profile: profile.IProfile;
  signout: () => void;
  isRegistered: boolean;
}

class Profile extends React.Component<IProps> {

  static navigationOptions = {
    tabBarLabel: I18n.t('profile.title'),
    title: I18n.t('profile.title'),
    headerLeft: null,
    headerRight: null,
    tabBarIcon: <Icon name="person" />,
  };

  renderProfile = () =>
    <SignoutButton />

  renderSignonButton = () =>
    this.props.apiStatus.loading || <SignonButton />

  render () {
    return (
      <GSContainer>
        {this.props.isRegistered && this.renderProfile() || this.renderSignonButton()}
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
