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
import { Icon } from 'native-base';

export interface IProps {
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

  renderProfile = () => {
    return <SignoutButton />;
  }

  render () {
    return (
      <GSContainer>
        {this.props.isRegistered && this.renderProfile() || <SignonButton />}
      </GSContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  signout: () => dispatch(signon.actions.signout()),
});

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  profile: state.profile,
  isRegistered: isRegistered(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
