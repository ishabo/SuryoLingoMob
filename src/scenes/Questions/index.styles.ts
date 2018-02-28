import glamor from 'glamorous-native';
import { Icon, Container } from 'native-base';
import { Platform } from 'react-native';

export const GSProgress = glamor.view({
  alignSelf: 'stretch',
  alignItems: 'center',
  marginBottom: 20,
  marginTop: Platform.OS === 'android' ? 15 : 25,
});

export const GSIcon = glamor(Icon)({
  position: 'absolute',
  top: 0,
  left: 10,
  fontSize: 40,
  color: 'gray',
});

export const GSFooterAndBody = glamor.view({
  flex: 1, justifyContent: 'space-between',
})

export const GSContainer = glamor(Container)({

});