import { Body } from 'native-base';
import { Platform } from 'react-native';
import glamor from 'glamorous-native';

export const GSHeader = glamor.view({
  backgroundColor: 'transparent',
  borderBottomWidth: 0,
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'stretch',
  marginTop: Platform.OS === 'ios' ? 30 : 0,
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
