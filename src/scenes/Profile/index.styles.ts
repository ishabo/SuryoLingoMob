import glamor from 'glamorous-native';
import colors from 'styles/colors';
import { GSCustomText } from 'styles/text';

export const GSContainer = glamor.view({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
});
GSContainer.displayName = 'GSContainer';

export const GSProfile = glamor.scrollView({
  flex: 1,
  alignSelf: 'stretch',
  margin: 16
});
GSProfile.displayName = 'GSProfile';

export const GSProfileDetails = glamor.view({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 10,
  padding: 2,
  alignSelf: 'stretch',
  borderBottomWidth: 0.4
});
GSProfileDetails.displayName = 'GSProfileDetails';

export const GSProfileDetailsItem = glamor(GSCustomText)({
  fontWeight: '900'
});
GSProfileDetailsItem.displayName = 'GSProfileDetailsItem';

export const GSProfilePictureFrame = glamor.view<{ inner?: boolean; outer?: boolean }>(
  {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  props => {
    if (props.outer) {
      return {
        width: 140,
        height: 140,
        backgroundColor: colors.lemonChiffon,
        borderRadius: 70,
        marginVertical: 20
      };
    } else if (props.inner) {
      return {
        width: 130,
        height: 130,
        backgroundColor: colors.white,
        borderRadius: 70,
        marginVertical: 20
      };
    } else {
      return {};
    }
  }
);
GSProfilePictureFrame.displayName = 'GSProfilePictureFrame';

export const GSProfilePicture = glamor.image({
  justifyContent: 'center',
  alignSelf: 'center',
  alignItems: 'center',
  width: 200,
  height: 200,
  borderRadius: 100
});
GSProfilePicture.displayName = 'GSProfilePicture';

export const GSPersonalDetails = glamor.view({
  marginVertical: 10
});
GSPersonalDetails.displayName = 'GSPersonalDetails';

export const GSBottom = glamor.view({
  alignItems: 'center'
});
GSBottom.displayName = 'GSBottom';
