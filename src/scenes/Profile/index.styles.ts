import { Container } from 'native-base';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { GSCustomText } from 'styles/text';
import { ScrollView } from 'react-native';

export const GSContainer: any = glamor(Container)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

export const GSProfile: any = glamor(ScrollView)({
  flex: 1,
  alignSelf: 'stretch',
  margin: 20
});

export const GSProfileDetails: any = glamor.view({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 10,
  padding: 2,
  alignSelf: 'stretch',
  borderBottomWidth: 0.4,
});

export const GSProfileDetailsItem: any = glamor(GSCustomText)({
  fontWeight: '900'
});

export const GSProfilePictureFrame: any = glamor.view<{ inner?: boolean, outer?: boolean }>(
  {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  (props) => {
    if (props.outer) {
      return ({
        width: 140,
        height: 140,
        backgroundColor: Colors.white,
        borderRadius: 70,
        marginVertical: 20,
      });
    } else if (props.inner) {
      return ({
        width: 130,
        height: 130,
        backgroundColor: Colors.lightBlue,
        borderRadius: 70,
        marginVertical: 20,
      });
    } else {
      return ({});
    }
  }
);

export const GSProfilePicture: any = glamor.image({
  width: 100,
  height: 100,
});