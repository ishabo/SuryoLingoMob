import * as React from 'react';
import { connect } from 'react-redux';
import { IInitialState } from 'services/reducers';
import { Hamburger } from 'components';
import I18n from 'I18n';
import * as profile from 'services/profile';
import * as leaderboard from 'services/leaderboard';
import { isUserInLeaderboard } from 'services/selectors';
import Images from 'assets/images';

import { NavigationScreenProp } from 'react-navigation';
import { GSContainer, GSTopUsers, GSTopUser, GSUserDetails, GSUserName, GSUserXP, GSUserBadge } from './index.styles';

import { GSDrawerLabel } from 'scenes/Drawer';
import { Dispatch } from 'redux';
import { getWindowWidth } from 'helpers';

export interface IProps {
  profile: profile.IProfile;
  signout: () => void;
  isUserInLeaderboard: boolean;
  navigation: NavigationScreenProp<any, any>;
  users: leaderboard.ILeaderboardUser[];
  fetchLeaderboard: () => void;
}

class Leaderboard extends React.Component<IProps> {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: I18n.t('leaderboard.title'),
    headerLeft: <Hamburger onPress={() => navigate('DrawerOpen')} />,
    drawerLabel: <GSDrawerLabel>{I18n.t('leaderboard.title')}</GSDrawerLabel>,
    headerRight: null
  });

  componentDidMount() {
    this.props.fetchLeaderboard();
  }

  returnBadge = (rank: number) => {
    switch (rank) {
      case 0:
        return Images.badges.first;
      case 1:
        return Images.badges.second;
      case 2:
        return Images.badges.third;
      default:
        return Images.logo.splash;
    }
  };

  renderLeaderboard() {
    return this.props.users.map((user: leaderboard.ILeaderboardUser, index: number) => (
      <GSTopUser key={user.id}>
        <GSUserDetails>
          <GSUserName>{user.name}</GSUserName>
        </GSUserDetails>
        <GSUserDetails>
          <GSUserXP>{user.userXp}</GSUserXP>
        </GSUserDetails>
        <GSUserBadge source={this.returnBadge(index)} />
      </GSTopUser>
    ));
  }

  render() {
    return (
      <GSContainer>
        <GSTopUsers
          contentContainerStyle={{
            alignItems: 'stretch',
            width: getWindowWidth()
          }}
        >
          {this.renderLeaderboard()}
        </GSTopUsers>
      </GSContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  fetchLeaderboard: () => dispatch(leaderboard.actions.fetchLeaderboard())
});

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  isUserInLeaderboard: isUserInLeaderboard(state),
  users: state.leaderboard.users,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard);
