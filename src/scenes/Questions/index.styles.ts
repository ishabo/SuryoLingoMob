import glamor from 'glamorous-native';
import { Icon, Body } from 'native-base';
import { Platform } from 'react-native';

export const GSHeader = glamor.view({
  backgroundColor: 'transparent',
  borderBottomWidth: 0,
  height: 50,
  justifyContent: 'center',
  alignContent: 'stretch',
  flexDirection: 'row',
  marginTop: Platform.OS === 'ios' ? 30 : 0,
});

export const GSProgress = glamor.view({
  flexDirection: 'row',
  alignContent: 'center',
  alignSelf: 'center',
});

export const GSBody = glamor(Body)({
  paddingHorizontal: 10,
  alignSelf: 'stretch',
  alignItems: 'stretch',
  justifyContent: 'center',
});

export const GSFooter = glamor.view({
  backgroundColor: 'transparent',
  justifyContent: 'flex-end',
  marginBottom: 12,
});

export const GSIcon = glamor(Icon)({
  position: 'absolute',
  top: 10,
  left: 10,
  fontSize: 30,
  color: 'gray',
});
