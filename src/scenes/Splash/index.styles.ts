import { Container } from 'native-base';
import glamor from 'glamorous-native';

export const GSContainer: any = glamor(Container)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
});

export const GSLogo: any = glamor.image({
  width: 300,
  height: 295,
});

export const GSVersion: any = glamor.text({
  fontSize: 18,
  marginTop: 10,
  alignItems: 'center',
});
