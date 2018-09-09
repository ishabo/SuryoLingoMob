import * as React from 'react';
import { connect } from 'react-redux';
import { IInitialState } from 'services/reducers';
import { Hamburger } from 'components';
import I18n from 'I18n';
import * as profile from 'services/profile';
import * as leaderboard from 'services/leaderboard';
import { isUserInLeaderboard } from 'services/selectors';
import images from 'assets/images';

import { NavigationScreenProp } from 'react-navigation';
import {
  GSContainer,
  GSTopUsers,
  GSCurrentUserPosition,
  GSTopUser,
  GSUserDetails,
  GSUserName,
  GSUserXP,
  GSUserProfilePicture,
  GSGap,
  GSRank
} from './index.styles';

import { GSDrawerLabel } from 'scenes/Drawer';
import { Dispatch } from 'redux';
import { getWindowWidth } from 'helpers';
import { GSCustomText } from 'styles/text';
import { Text } from 'react-native-animatable';

export interface IProps {
  profile: profile.IProfile;
  signout: () => void;
  isUserInLeaderboard: boolean;
  navigation: NavigationScreenProp<any, any>;
  topUsers: leaderboard.ILeaderboardUser[];
  fetchLeaderboard: () => void;
  currentUserPosition: number;
  currentUserCourseXpRatio: number;
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

  renderUser = (user: leaderboard.ILeaderboardUser, rank: number) => (
    <GSTopUser key={user.id} highlight={user.id === this.props.profile.id}>
      <GSRank>
        <Text animation="pulse" easing="ease-out" iterationCount={1}>
          {rank}
        </Text>
      </GSRank>
      <GSUserDetails align="right">
        <GSUserName>{user.name}</GSUserName>
      </GSUserDetails>
      <GSUserDetails align="center">
        <GSUserXP>{user.userXp}</GSUserXP>
      </GSUserDetails>
      <GSUserDetails align="left">
        <GSUserProfilePicture source={this.renderProfilePicture(user.profilePic)} />
      </GSUserDetails>
    </GSTopUser>
  );

  renderProfilePicture = (profilePic: string) => {
    return profilePic ? { uri: profilePic } : images.logo.plain;
  };

  renderLeaderboard = () => this.props.topUsers.map((user, index) => this.renderUser(user, index + 1));

  renderUserPosition = () => {
    const { profile } = this.props;
    const { id, name, userXp } = profile;
    const ratio = this.props.currentUserCourseXpRatio;
    return this.renderUser({ id, name, userXp, ratio }, this.props.currentUserPosition);
  };

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
          {this.props.isUserInLeaderboard || (
            <GSCurrentUserPosition>
              <GSGap>
                <GSCustomText style={{ alignSelf: 'center', fontSize: 30 }}>...</GSCustomText>
              </GSGap>
              {this.renderUserPosition()}
            </GSCurrentUserPosition>
          )}
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
  topUsers: state.leaderboard.topUsers,
  currentUserPosition: state.leaderboard.currentUserPosition,
  currentUserCourseXpRatio: state.leaderboard.currentUserCourseXpRatio,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard);
