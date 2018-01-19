import { Container } from 'native-base';
import glamor from 'glamorous-native';

export const GSContainer = glamor(Container)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
});

export const GSLogo = glamor.image({
  width: 300,
  height: 295,
});
