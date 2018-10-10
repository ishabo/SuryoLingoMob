import { Item, Input, Label, Form } from 'native-base';
import Colors from 'styles/colors';
import glamor from 'glamorous-native';
import { GSCustomText, ICustomText } from 'styles/text';
import { scaleSize, isShortDevice, isNarrowDevice } from 'helpers';

export const GSLebel = glamor(Label)({
  color: 'black'
});
GSLebel.displayName = 'GSLebel';

export const GSInput = glamor(Input)<{ dir?: 'rtl' | 'ltr' }>(
  {
    paddingRight: 50,
    height: isShortDevice() ? 40 : 50,
    fontSize: scaleSize(18, 14)
  },
  ({ dir }) => ({
    writingDirection: dir ? 'rtl' : dir,
    textAlign: dir === 'ltr' ? 'left' : 'right'
  })
);
GSInput.displayName = 'GSInput';

export const GSItem = glamor(Item)({
  marginVertical: isShortDevice() ? 3 : 5
});
GSItem.displayName = 'GSItem';

export const GSForm = glamor(Form)({
  justifyContent: 'flex-start',
  paddingHorizontal: isNarrowDevice() ? 6 : 4,
  alignSelf: 'stretch'
});
GSForm.displayName = 'GSForm';

export const GSErrorText = glamor(GSCustomText)<ICustomText>({
  color: Colors.red,
  fontSize: 14,
  marginLeft: 20
});
GSErrorText.displayName = 'GSErrorText';
