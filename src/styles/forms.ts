import {
  Item, Input, Label, Form,
} from 'native-base';

import Colors from 'styles/colors';
import glamor from 'glamorous-native';

export const GSLebel = glamor(Label)({
  color: 'black',
});

export const GSInput = glamor(Input)<{ dir?: 'rtl' | 'ltr' }>(
  {},
  ({ dir }) => ({
    writingDirection: dir ? 'rtl' : dir,
    textAlign: dir === 'ltr' ? 'left' : 'right',
  }),
);

export const GSItem = glamor(Item)({
  marginVertical: 5,
});

export const GSForm = glamor(Form)({
  justifyContent: 'flex-start',
  paddingHorizontal: 10,
});

export const GSErrorText = glamor.text<{ visible?: boolean }>(
  {
    color: Colors.red,
  },
  props => ({
    fontSize: props.visible ? 15 : 0,
  }),
);

export const GSNextButtons = glamor.view({
  alignItems: 'stretch',
  alignSelf: 'stretch',
  alignContent: 'center',
  justifyContent: 'space-around',
  marginTop: 20,
  flexDirection: 'row',
});
