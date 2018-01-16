import { Body } from 'native-base';
import glamor from 'glamorous-native';

export const GSHeader = glamor.view({
  backgroundColor: 'transparent',
  borderBottomWidth: 0,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
});

export const GSBody = glamor(Body)({
  paddingHorizontal: 10,
  alignSelf: 'stretch',
  alignItems: 'stretch',
});

export const GSFooter = glamor.view({
  backgroundColor: 'transparent',
  justifyContent: 'flex-end',
  marginBottom: 12,

});
