import glamor from 'glamorous-native';
import { Icon, Body } from 'native-base';

export const GSHeader = glamor.view({
  backgroundColor: 'transparent',
  borderBottomWidth: 0,
  height: 60,
});

export const GSProgress = glamor.view({
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

export const GSFooter = glamor.view({
  backgroundColor: 'transparent',

  justifyContent: 'flex-end',
  marginBottom: 10,
});

export const GSIcon = glamor(Icon)({
  position: 'absolute',
  left: 15,
  top: 22,
  fontSize: 40,
  color: 'gray',
});
