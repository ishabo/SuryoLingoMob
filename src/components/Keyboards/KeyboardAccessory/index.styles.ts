import glamor from 'glamorous-native';
import { Button } from 'native-base';

export const GSKeyboardToolBar = glamor.view({
  justifyContent: 'flex-end',
  backgroundColor: 'white',
  padding: 8,
  flexDirection: 'row'
});

export const GSKeyboardCloseButton = glamor(Button)({
  width: 30,
  height: 34,
  margin: 2
});

export const GSKeyboardToggleButton = glamor(Button)({
  width: 64,
  height: 34,
  margin: 2
});
