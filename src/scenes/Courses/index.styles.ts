import { TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import { GSCustomText } from 'styles/text';
import * as Animatable from 'react-native-animatable';
import glamor from 'glamorous-native';

export const GSContainer = glamor(Container)({
  flex: 1
});

export const GSTitle = glamor(GSCustomText)({
  fontSize: 30,
  alignSelf: 'center',
  textAlign: 'center'
}) as any;

export const GSCourse = glamor(TouchableOpacity as any)({
  alignContent: 'stretch',
  alignItems: 'stretch',
  justifyContent: 'center'
}) as any;

export const GSAnimatable = glamor(Animatable.View as any)({
  alignSelf: 'stretch',
  marginHorizontal: 10,
  justifyContent: 'space-around',
  flex: 1
});
