import { Container } from 'native-base'
import glamor from 'glamorous-native'
import colors from '@sl/styles/colors'
import { getWindowWidth } from '@sl/helpers'

export const GSContainer = glamor(Container)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})

export const GSTopUsers = glamor.scrollView({
  alignContent: 'stretch',
})

export const GSCurrentUserPosition = glamor.view({})

export const GSGap = glamor.view({
  height: 80,
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottomWidth: 1,
  borderBottomColor: colors.lightGray,
  flex: 1,
  width: getWindowWidth(),
})

export const GSTopUser = glamor.view<{ highlight?: boolean; header?: boolean }>(
  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  ({ highlight, header }) =>
    header
      ? { backgroundColor: colors.lightBlue }
      : {
          backgroundColor: highlight ? colors.lemonChiffon : 'transparent',
        },
)

export const GSRank = glamor.view({
  padding: 20,
  borderLeftWidth: 1,
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: colors.lightGray,
})

export const GSUserDetails = glamor.view<{
  align: 'left' | 'right' | 'center' | 'stretch'
}>(
  {
    justifyContent: 'center',
    flex: 1,
  },
  ({ align }) => {
    switch (align) {
      case 'stretch':
        return { alignItems: 'stretch', alignSelf: 'stretch' }
      case 'center':
        return { alignItems: 'center' }
      case 'left':
        return { alignItems: 'flex-end' }
      case 'right':
        return { alignItems: 'flex-start' }
      default:
        return {}
    }
  },
)

export const GSUserName = glamor.text({
  writingDirection: 'rtl',
})

export const GSUserXP = glamor.text({
  fontWeight: '900',
  fontSize: 16,
  fontFamily: 'Arial',
})

export const GSUserProfilePicture = glamor.image({
  width: 70,
  height: 70,
  alignSelf: 'center',
  borderRadius: 35,
})

export const GSProfilePictureFrame = glamor.view<{
  inner?: boolean
  outer?: boolean
}>(
  {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  (props) => {
    if (props.outer) {
      return {
        width: 100,
        height: 100,
        backgroundColor: colors.white,
        borderRadius: 70,
        marginVertical: 10,
      }
    }
    if (props.inner) {
      return {
        width: 90,
        height: 90,
        backgroundColor: colors.lightBlue,
        borderRadius: 70,
        marginVertical: 10,
      }
    }
    return {}
  },
)
