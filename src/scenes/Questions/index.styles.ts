import glamor from 'glamorous-native';
import { Icon, Container } from 'native-base';
import { Platform } from 'react-native';

export const GSProgress: any = glamor.view({
  alignSelf: 'stretch',
  alignItems: 'center',
  marginBottom: 20,
  marginTop: Platform.OS === 'android' ? 15 : 25,
});

export const GSIcon: any = glamor(Icon)({
  position: 'absolute',
  top: Platform.OS === 'android' ? 0 : 10,
  left: Platform.OS === 'android' ? 10 : 15,
  fontSize: 40,
  color: 'gray',
});

export const GSFooterAndBody: any = glamor.view({
  flex: 1, justifyContent: 'space-between',
})

export const GSContainer: any = glamor(Container)({

});