import {
  Button, Icon,
} from 'native-base';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native';
export * from 'styles/forms';
export * from 'styles/text';

export const GSContainer: any = glamor(KeyboardAvoidingView)({
  justifyContent: 'space-between',
});

export const GSForgotPassword: any = glamor(TouchableOpacity)({
  alignSelf: 'center',
  marginTop: 10,
  padding: 10,
});

export const GSTabs: any = glamor.view({
  flexDirection: 'row',
  height: 80,
});

export const GSTabButton: any = glamor(Button)({
  paddingHorizontal: 10,
  width: 170,
  alignSelf: 'center',
});

export const GSButtonText: any = glamor.text<{ color: string; large: boolean; }>(
  {
    alignSelf: 'center',
  },
  props => ({
    color: props.color,
    fontSize: props.large ? 18 : 12,
  }),
);

export const GSIcon: any = glamor(Icon)({
  position: 'absolute',
  right: 15,
  top: 10,
  fontSize: 20,
  color: Colors.black,
  zIndex: 100,
});

export const GSFooter: any = glamor.view({
  backgroundColor: 'transparent',
  justifyContent: 'flex-end',
  marginBottom: 12,
});

export const GSError: any = glamor.text({
  color: Colors.red,
});

export const GSDescription: any = glamor.text({
  textAlign: 'center',
  fontSize: 18,
  paddingVertical: 10,
});
