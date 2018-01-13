import {
  Button, Item,
  Input, Icon, Label, Form,
} from 'native-base';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { CustomText } from 'styles/text';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
const ViewWrapper = Platform.OS === 'android' ? View : KeyboardAvoidingView;

export const GSContainer = glamor(ViewWrapper)({
  flex: 1,
});

export const GSTabs = glamor.view({
  flexDirection: 'row',
  marginTop: 20,
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

});

export const GSItem = glamor(Item)({
  marginVertical: 10,
});

export const GSForm = glamor(Form)({
  padding: 10,
  marginTop: 20,
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
  justifyContent: 'space-between',
  flex: 1,
  marginBottom: 20,
});

export const GSTitle = glamor(CustomText)({
  fontSize: 30,
});

export const GSDescription = glamor.text({
  textAlign: 'center',
  fontSize: 18,
  paddingVertical: 10,
});
