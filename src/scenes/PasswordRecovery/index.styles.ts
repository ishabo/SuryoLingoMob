import { Container } from 'native-base';
import glamor from 'glamorous-native';
export * from 'styles/text';

export const GSContainer = glamor(Container)({
  flex: 1,
  paddingTop: 30,
  alignItems: 'center',
  backgroundColor: 'white',
});
