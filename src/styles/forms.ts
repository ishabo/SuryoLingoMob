import {
  Item, Input, Label, Form,
} from 'native-base';

import Colors from 'styles/colors';
import glamor from 'glamorous-native';
import { GSCustomText } from 'styles/text';
import { scaleSize } from 'helpers';

export const GSLebel: any = glamor(Label)({
  color: 'black',
});

export const GSInput: any = glamor(Input)<{ dir?: 'rtl' | 'ltr' }>(
  {
    paddingRight: 50,
    fontSize: scaleSize(18, 14),
  },
  ({ dir }) => ({
    writingDirection: dir ? 'rtl' : dir,
    textAlign: dir === 'ltr' ? 'left' : 'right',
  }),
);

export const GSItem: any = glamor(Item)({
  marginVertical: 5,
});

export const GSForm: any = glamor(Form)({
  justifyContent: 'flex-start',
  paddingHorizontal: 10,
});

export const GSErrorText: any = glamor(GSCustomText)({
  color: Colors.red,
  fontSize: 14,
  marginLeft: 20,
});

export const GSNextButtons: any = glamor.view({
  alignItems: 'stretch',
  alignSelf: 'stretch',
  alignContent: 'center',
  justifyContent: 'space-around',
  marginTop: 20,
  flexDirection: 'row',
});
