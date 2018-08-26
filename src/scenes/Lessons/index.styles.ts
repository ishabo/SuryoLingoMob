import * as Animatable from 'react-native-animatable';
import glamor from 'glamorous-native';
import colors from 'styles/colors';

export const GSContainer = glamor.view({
  alignItems: 'center',
  alignSelf: 'stretch',
  justifyContent: 'space-between',
  backgroundColor: colors.whiteSmoke
});

export const GSLessonIcon = glamor.view({
  position: 'absolute',
  top: 10,
  width: 150
});

export const GSLessonInstruction = glamor.view({
  justifyContent: 'center',
  alignSelf: 'center',
  marginTop: 150,
  marginBottom: 20
});

export const GSAnimatable = glamor(Animatable.View as any)({
  alignSelf: 'center',
  justifyContent: 'center'
});
