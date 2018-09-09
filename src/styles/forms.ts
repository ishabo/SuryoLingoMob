import { Item, Input, Label, Form } from 'native-base';
import Colors from 'styles/colors';
import glamor from 'glamorous-native';
import { GSCustomText, ICustomText } from 'styles/text';
import { scaleSize } from 'helpers';

export const GSLebel = glamor(Label)({
  color: 'black'
});

export const GSInput = glamor(Input)<{ dir?: 'rtl' | 'ltr' }>(
  {
    paddingRight: 50,
    height: 50,
    fontSize: scaleSize(18, 14)
  },
  ({ dir }) => ({
    writingDirection: dir ? 'rtl' : dir,
    textAlign: dir === 'ltr' ? 'left' : 'right'
  })
);

export const GSItem = glamor(Item)({
  marginVertical: 5
});

export const GSForm = glamor(Form)({
  justifyContent: 'flex-start',
  paddingHorizontal: 10,
  flex: 1
});

export const GSErrorText = glamor(GSCustomText)<ICustomText>({
  color: Colors.red,
  fontSize: 14,
  marginLeft: 20
});
