import { Container } from 'native-base';
import glamor from 'glamorous-native';

export const GSContainer: any = glamor(Container)({
  alignSelf: 'center',
  justifyContent: 'center',
});

export const GSCongratMessage: any = glamor.text({
  padding: 50,
  fontSize: 30,
  textAlign: 'center',
});

export const GSXPGain: any = glamor.text({
  padding: 20,
  fontSize: 20,
  textAlign: 'center',
});

export const GSNextButton: any = glamor.view({
  height: 100,
  justifyContent: 'space-between',
  marginVertical: 5,
});
