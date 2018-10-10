import glamor from 'glamorous-native';
import { Container } from 'native-base';
import { GSCustomText, ICustomText } from 'styles/text';
import { scaleSize, getWindowWidth } from 'helpers';

export const GSContainer = glamor(Container)({
  paddingVertical: 50,
  alignItems: 'center'
});
GSContainer.displayName = 'GSContainer';

export const GSMeaning = glamor.view({
  marginVertical: 30,
  borderBottomWidth: 1,
  width: getWindowWidth() - 100,
  borderColor: 'gray'
});
GSMeaning.displayName = 'GSMeaning';

export const GSPhrase = glamor(GSCustomText)<ICustomText>({
  textAlign: 'center',
  fontSize: scaleSize(26, 20),
  flexWrap: 'wrap',
  alignSelf: 'center'
});
GSPhrase.displayName = 'GSPhrase';
