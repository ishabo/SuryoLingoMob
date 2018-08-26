import { Container } from 'native-base';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { getWindowWidth } from 'helpers';

export const GSContainer = glamor(Container)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
});

export const GSTopUsers = glamor.scrollView({
  alignContent: 'stretch'
});

export const GSTopUser = glamor.view({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 20,
  borderBottomWidth: 1,
  borderBottomColor: Colors.gray
});

export const GSUserDetails = glamor.view({
  alignItems: 'flex-start',
  width: getWindowWidth() / 3
});

export const GSUserName = glamor.text({});

export const GSUserXP = glamor.text({});

export const GSUserBadge = glamor.image({
  width: 60,
  height: 60
});

export const GSProfilePictureFrame = glamor.view<{ inner?: boolean; outer?: boolean }>(
  {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  props => {
    if (props.outer) {
      return {
        width: 100,
        height: 100,
        backgroundColor: Colors.white,
        borderRadius: 70,
        marginVertical: 10
      };
    } else if (props.inner) {
      return {
        width: 90,
        height: 90,
        backgroundColor: Colors.lightBlue,
        borderRadius: 70,
        marginVertical: 10
      };
    } else {
      return {};
    }
  }
);
