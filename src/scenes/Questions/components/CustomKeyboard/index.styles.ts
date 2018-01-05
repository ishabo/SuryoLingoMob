import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { View } from 'react-native';

import {
  Container,
  Button,
} from 'native-base';

export const GSContainer = glamor(Container, { displayName: 'CustomKeyboard' })({
  zIndex: 100,
});

export const GSKey = glamor(Button)({
  width: 40,
  height: 40,
  margin: 4,
});

export const GSKeyText = glamor.text({
  textAlign: 'center',
  width: 10,
  flex: 1,
  height: 20,
  color: Colors.white,
});

export const GSContent = glamor(View, { displayName: 'GSContent' })({
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  alignSelf: 'flex-start',
});

export const GSSpaceKey = glamor(Button)({
  flex: 1,
  height: 40,
  margin: 4,
});

export const GSBackSpaceKey = glamor(Button)({
  width: 88,
  height: 40,
  margin: 4,
});
