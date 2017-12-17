import glamor from 'glamorous-native';
import { View, Icon, Body } from 'native-base';

export const GSHeader = glamor(View)({
  backgroundColor: 'transparent',
  borderBottomWidth: 0,
  height: 60,
});

export const GSProgress = glamor(View)({
  flexDirection: 'row',
  alignContent: 'center',
  alignSelf: 'center',
  paddingTop: 40,
  borderWidth: 0,
});

export const GSBody = glamor(Body)({
  marginTop: 40,
  flex: 1,
  alignContent: 'stretch',
  width: 340,
});

export const GSFooter = glamor(View)({
  backgroundColor: 'transparent',
  borderTopWidth: 0,
  marginBottom: 10,
});

export const GSIcon = glamor(Icon)({
  position: 'absolute',
  left: 15,
  top: 22,
  fontSize: 40,
  color: 'gray',
});
