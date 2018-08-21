import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import { GSCustomText, ICustomText } from 'styles/text';

export const GSContainer = glamor.view({
  justifyContent: 'center',
  backgroundColor: 'white'
});

const textStyle = {
  textAlign: 'center',
  alignSelf: 'center',
  color: Colors.white,
  fontSize: 20
};

export const GSKeyText = glamor(GSCustomText)<ICustomText>({
  ...textStyle
});

export const GSIcon = glamor(Icon)({
  ...textStyle,
  alignSelf: 'flex-start',
  marginLeft: 10,
  fontSize: 25
});

export const GSContent = glamor(View as any, { displayName: 'GSContent' })({
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'center'
});

export const GSButton = glamor(TouchableOpacity as any)<{ onPress: () => void }>({
  width: 78,
  height: 30,
  margin: 1,
  borderRadius: 4,
  backgroundColor: '#1373E4',
  alignContent: 'stretch',
  alignSelf: 'center',
  justifyContent: 'center'
});

export const GSReturnKey = glamor(GSButton)({});

export const GSKey = glamor(GSButton)({
  width: 25
});

export const GSBackSpaceKey = glamor(GSButton)({
  width: 60
});

export const GSSpaceKey = glamor(GSButton)({ width: 160 });
