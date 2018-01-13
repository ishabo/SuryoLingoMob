import glamor from 'glamorous-native';
import { Icon } from 'native-base';

export const GSProgress = glamor.view({
  alignSelf: 'center',
  marginBottom: 20,
  marginTop: 5,
});

export const GSIcon = glamor(Icon)({
  position: 'absolute',
  top: -13,
  left: -10,
  fontSize: 40,
  color: 'gray',
});
