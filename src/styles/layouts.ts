import glamor from 'glamorous-native';
import { Platform, KeyboardAvoidingView } from 'react-native';

export const GSHeader: any = glamor.view({
  backgroundColor: 'transparent',
  borderBottomWidth: 0,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: Platform.OS === 'ios' ? 30 : 10,
});

export const GSBody: any = glamor(KeyboardAvoidingView)({
  flex: 1,
  paddingHorizontal: 10,
  alignSelf: 'stretch',
  alignItems: 'stretch',
});

export const GSFooter: any = glamor.view({
  backgroundColor: 'transparent',
  justifyContent: 'flex-end',
  marginBottom: 20,
});
