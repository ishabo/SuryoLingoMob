import glamor from 'glamorous-native';
import { Platform, KeyboardAvoidingView } from 'react-native';

export const GSHeader = glamor.view({
  backgroundColor: 'transparent',
  borderBottomWidth: 0,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: Platform.OS === 'ios' ? 20 : 10,
});

export const GSBody = glamor(KeyboardAvoidingView)({
  flex: 1,
  paddingHorizontal: 10,
  alignSelf: 'stretch',
  alignItems: 'stretch',
});

export const GSFooter = glamor.view({
  backgroundColor: 'transparent',
  justifyContent: 'flex-end',
  marginBottom: 20,
});
