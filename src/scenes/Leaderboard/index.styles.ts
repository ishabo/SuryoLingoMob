import { Container } from 'native-base';
import glamor from 'glamorous-native';
import colors from 'styles/colors';
import { getWindowWidth } from 'helpers';

export const GSContainer = glamor(Container)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
});

export const GSTopUsers = glamor.scrollView({
  alignContent: 'stretch'
});

export const GSCurrentUserPosition = glamor.view({});

export const GSGap = glamor.view({
  height: 80,
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottomWidth: 1,
  borderBottomColor: colors.lightGray,
  flex: 1,
  width: getWindowWidth()
});

export const GSTopUser = glamor.view<{ highlight: boolean }>(
  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray
  },
  ({ highlight }) => ({
    backgroundColor: highlight ? colors.lemonChiffon : 'transparent'
  })
);

export const GSRank = glamor.view({
  width: 50,
  height: 50,
  padding: 2,
  borderWidth: 1,
  borderRadius: 100,
  marginHorizontal: 10,
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: colors.lightGray
});

export const GSUserDetails = glamor.view<{ align: 'left' | 'right' | 'center' }>(
  {
    justifyContent: 'center',
    paddingHorizontal: 20,
    flex: 1
  },
  ({ align }) => {
    switch (align) {
      case 'center':
        return { alignItems: 'center' };
      case 'left':
        return { alignItems: 'flex-end' };
      case 'right':
        return { alignItems: 'flex-start' };
      default:
        return {};
    }
  }
);

export const GSUserName = glamor.text({
  writingDirection: 'rtl'
});

export const GSUserXP = glamor.text({});

export const GSUserBadge = glamor.image({
  width: 70,
  height: 60,
  alignSelf: 'center'
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
        backgroundColor: colors.white,
        borderRadius: 70,
        marginVertical: 10
      };
    } else if (props.inner) {
      return {
        width: 90,
        height: 90,
        backgroundColor: colors.lightBlue,
        borderRadius: 70,
        marginVertical: 10
      };
    } else {
      return {};
    }
  }
);
