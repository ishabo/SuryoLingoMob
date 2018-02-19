import { TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import { GSCustomText } from 'styles/text';
import * as Animatable from 'react-native-animatable';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';

export const GSContainer = glamor(Container)({
  flex: 1,
  justifyContent: 'center',
  alignContent: 'stretch',
  alignItems: 'stretch',
});

export const GSCourseTitle = glamor(GSCustomText)({
  fontSize: 30,
  alignSelf: 'center',
  textAlign: 'center',
});

export const GSCourseSubTitle = glamor(GSCustomText)({
  fontSize: 28,
  alignSelf: 'center',
  textAlign: 'center',
  color: Colors['white'],
});

export const GSCourse = glamor(TouchableOpacity)({
  alignContent: 'stretch',
  alignItems: 'stretch',
  justifyContent: 'center',
});

export const GSAnimatable = glamor(Animatable.View)({
  alignSelf: 'stretch',
  marginHorizontal: 10,
  justifyContent: 'space-around',
  flex: 1,
});
