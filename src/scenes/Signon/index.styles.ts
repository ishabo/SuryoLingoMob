import {
  Button, Item,
  Input, Icon, Label, Form,
} from 'native-base';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { CustomText } from 'styles/text';
import { KeyboardAvoidingView } from 'react-native';

export const GSContainer = glamor(KeyboardAvoidingView)({
  justifyContent: 'space-between',
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

export const GSInput = glamor(Input)({
  writingDirection: 'rtl',
  textAlign: 'right',
});

export const GSIcon = glamor(Icon)({
  position: 'absolute',
  right: 15,
  top: 10,
  fontSize: 20,
  color: Colors.black,
  zIndex: 100,
});

export const GSItem = glamor(Item)({
  marginVertical: 5,
});

export const GSForm = glamor(Form)({
  justifyContent: 'flex-start',
});

export const GSFooter = glamor.view({
  backgroundColor: 'transparent',
  justifyContent: 'flex-end',
  marginBottom: 12,
});

export const GSError = glamor.text({
  color: Colors.red,
});

export const GSLebel = glamor(Label)({});

export const GSNextButtons = glamor.view({
  alignItems: 'stretch',
  alignSelf: 'stretch',
  alignContent: 'center',
  justifyContent: 'space-around',
  marginTop: 20,
  flexDirection: 'row',
});

export const GSTitle = glamor(CustomText)({
  padding: 10,
  fontSize: 30,
});

export const GSDescription = glamor.text({
  textAlign: 'center',
  fontSize: 18,
  paddingVertical: 10,
});
