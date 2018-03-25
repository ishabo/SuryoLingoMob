import { TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import { GSCustomText } from 'styles/text';
import * as Animatable from 'react-native-animatable';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';

export const GSContainer: any = glamor(Container)({
  flex: 1,
});

export const GSCourseTitle: any = glamor(GSCustomText)({
  fontSize: 30,
  alignSelf: 'center',
  textAlign: 'center',
});

export const GSCourseSubTitle: any = glamor(GSCustomText)({
  fontSize: 28,
  alignSelf: 'center',
  textAlign: 'center',
  color: Colors['white'],
});

export const GSCourse: any = glamor(TouchableOpacity)({
  alignContent: 'stretch',
  alignItems: 'stretch',
  justifyContent: 'center',
});

export const GSAnimatable: any = glamor(Animatable.View)({
  alignSelf: 'stretch',
  marginHorizontal: 10,
  justifyContent: 'space-around',
  flex: 1,
});
