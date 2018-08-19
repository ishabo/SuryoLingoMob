import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { View } from 'react-native';
import { Container, Button } from 'native-base';
import { GSCustomText, ICustomText } from 'styles/text';

export const GSContainer = glamor(Container, { displayName: 'CustomKeyboard' })({
  alignContent: 'center',
  alignSelf: 'center',
  zIndex: 100,
  flex: 1
});

export const GSKey = glamor(Button)({
  width: 35,
  height: 35,
  margin: 2
});

export const GSKeyText = glamor(GSCustomText)<ICustomText>({
  textAlign: 'center',
  width: 10,
  flex: 1,
  height: 20,
  color: Colors.white
});

export const GSContent = glamor(View, { displayName: 'GSContent' })({
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'center'
});

export const GSSpaceKey = glamor(Button)({
  width: 200,
  height: 38,
  margin: 2
});

export const GSReturnKey = glamor(Button)({
  width: 78,
  height: 38,
  margin: 2
});

export const GSBackSpaceKey = glamor(Button)({
  width: 78,
  height: 35,
  margin: 2
});
