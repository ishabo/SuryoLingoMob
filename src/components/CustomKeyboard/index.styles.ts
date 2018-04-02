import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { View } from 'react-native';

import {
  Container,
  Button,
} from 'native-base';
import { GSCustomText } from 'styles/text';

export const GSContainer: any = glamor(Container, { displayName: 'CustomKeyboard' })({
  alignContent: 'center',
  alignSelf: 'center',
  zIndex: 100,
});

export const GSKey: any = glamor(Button)({
  width: 38,
  height: 38,
  margin: 4,
});

export const GSKeyText: any = glamor(GSCustomText)({
  textAlign: 'center',
  width: 10,
  flex: 1,
  height: 20,
  color: Colors.white,
});

export const GSContent: any = glamor(View, { displayName: 'GSContent' })({
  maxWidth: 310,
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  alignSelf: 'flex-start',
  justifyContent: 'center',
});

export const GSSpaceKey: any = glamor(Button)({
  width: 269,
  height: 38,
  margin: 4,
});

export const GSBackSpaceKey: any = glamor(Button)({
  width: 85,
  height: 38,
  margin: 4,
});
