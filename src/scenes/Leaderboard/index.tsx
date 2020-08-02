import * as React from 'react';
import { connect } from 'react-redux';
import { IInitialState } from '@sl/services/reducers';
import { Hamburger, DrawerItem } from '@sl/components';
import I18n from '@sl/i18n';
import * as profile from '@sl/services/profile';
import * as leaderboard from '@sl/services/leaderboard';
import { isUserInLeaderboard } from '@sl/services/selectors';
import images from '@sl/assets/images';
import analytics from '@react-native-firebase/analytics';

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
  GSRank,
} from './index.styles';

import { Dispatch } from 'redux';
import { getWindowWidth } from '@sl/helpers';
import { GSCustomText } from '@sl/styles/text';
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
    drawerLabel: (
      <DrawerItem label={I18n.t('leaderboard.title')} icon="leaderboard" />
    ),
    headerRight: null,
  });

  componentDidMount() {
    analytics().setCurrentScreen(this.constructor.name);
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
        <GSUserProfilePicture
          source={this.renderProfilePicture(user.profilePic)}
        />
      </GSUserDetails>
      <GSUserDetails align="stretch">
        <GSUserName>
          {user.name ? user.name.split(' ')[0] : I18n.t('profile.me')}
        </GSUserName>
      </GSUserDetails>
      <GSUserDetails align="center">
        <GSUserXP>{user.userXp}</GSUserXP>
      </GSUserDetails>
    </GSTopUser>
  );

  renderProfilePicture = (profilePic: string) => {
    return profilePic ? { uri: profilePic } : images.profile.default;
  };

  renderLeaderboard = () =>
    this.props.topUsers.map((user, index) => this.renderUser(user, index + 1));

  renderUserPosition = () => {
    const { profile } = this.props;
    const { id, name, userXp } = profile;
    const ratio = this.props.currentUserCourseXpRatio;
    return this.renderUser(
      { id, name, userXp, ratio },
      this.props.currentUserPosition
    );
  };

  render() {
    return (
      <GSContainer>
        <GSTopUsers
          contentContainerStyle={{
            alignItems: 'stretch',
            width: getWindowWidth(),
          }}
        >
          {this.renderLeaderboard()}
          {this.props.isUserInLeaderboard || (
            <GSCurrentUserPosition>
              <GSGap>
                <GSCustomText style={{ alignSelf: 'center', fontSize: 30 }}>
                  ...
                </GSCustomText>
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
  fetchLeaderboard: () => dispatch(leaderboard.actions.fetchLeaderboard()),
});

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  isUserInLeaderboard: isUserInLeaderboard(state),
  topUsers: state.leaderboard.topUsers,
  currentUserPosition: state.leaderboard.currentUserPosition,
  currentUserCourseXpRatio: state.leaderboard.currentUserCourseXpRatio,
  profile: state.profile,
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
