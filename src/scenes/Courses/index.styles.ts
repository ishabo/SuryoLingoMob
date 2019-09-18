import { Container } from 'native-base';
import { GSCustomText } from '@sl/styles/text';
import * as Animatable from 'react-native-animatable';
import glamor from 'glamorous-native';

export const GSContainer = glamor(Container)({
  flex: 1
});
GSContainer.displayName = 'GSContainer';

export const GSTitle = glamor(GSCustomText)({
  fontSize: 30,
  alignSelf: 'center',
  textAlign: 'center'
});
GSTitle.displayName = 'GSTitle';

export const GSCourse = glamor.touchableOpacity({
  alignContent: 'stretch',
  alignItems: 'stretch',
  justifyContent: 'center'
});
GSCourse.displayName = 'GSCourse';

export const GSAnimatable = glamor(Animatable.View as any)({
  alignSelf: 'stretch',
  marginHorizontal: 10,
  justifyContent: 'space-around',
  flex: 1
});
GSAnimatable.displayName = 'GSAnimatable';
