import glamor from 'glamorous-native';
import { Icon } from 'native-base';

export const GSProgress = glamor.view({
  alignSelf: 'center',
  marginBottom: 20,
});

export const GSIcon = glamor(Icon)({
  position: 'absolute',
  top: -15,
  left: -5,
  fontSize: 40,
  color: 'gray',
});
