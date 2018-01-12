import {
  Container, Button, Item,
  Input, Icon, Label, Form,
} from 'native-base';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { CustomText } from 'styles/text';

export const GSContainer = glamor(Container)({
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
  flex: 1,
  padding: 10,
  alignSelf: 'stretch',
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

export const GSLebel = glamor(Label)({

});

export const GSNextButtons = glamor.view({
  justifyContent: 'space-between',
  height: 120,
});

export const GSTitle = glamor(CustomText)({
  fontSize: 30,
});

export const GSDescription = glamor.text({
  textAlign: 'center',
  fontSize: 18,
  paddingVertical: 10,
});
