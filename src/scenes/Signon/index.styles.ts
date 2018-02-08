import {
  Button, Icon,
} from 'native-base';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native';
export * from 'styles/forms';
export * from 'styles/text';

export const GSContainer = glamor(KeyboardAvoidingView)({
  justifyContent: 'space-between',
});

export const GSForgotPassword = glamor(TouchableOpacity)({
  alignSelf: 'center',
  marginTop: 10,
  padding: 10,
});

export const GSTabs = glamor.view({
  flexDirection: 'row',
  height: 80,
});

export const GSTabButton = glamor(Button)({
  paddingHorizontal: 10,
  width: 170,
  alignSelf: 'center',
});

export const GSButtonText = glamor.text<{ color: string; }>(
  {
    alignSelf: 'center',
  },
  props => ({
    color: props.color,
  }),
);

export const GSIcon = glamor(Icon)({
  position: 'absolute',
  right: 15,
  top: 10,
  fontSize: 20,
  color: Colors.black,
  zIndex: 100,
});

export const GSFooter = glamor.view({
  backgroundColor: 'transparent',
  justifyContent: 'flex-end',
  marginBottom: 12,
});

export const GSError = glamor.text({
  color: Colors.red,
});

export const GSDescription = glamor.text({
  textAlign: 'center',
  fontSize: 18,
  paddingVertical: 10,
});
