import glamor from 'glamorous-native';
import colors from 'styles/colors';
import { getWindowWidth } from 'helpers';

export const GSContainer = glamor.view({
  backgroundColor: colors.whiteSmoke
});
GSContainer.displayName = 'GSContainer';

export const GUnit = glamor.view({
  justifyContent: 'space-around',
  flexDirection: 'row'
});
GUnit.displayName = 'GUnit';

export const GComingSoonSeparator = glamor.text({
  padding: 4,
  fontSize: 16,
  elevation: 2,
  marginVertical: 20,
  shadowOpacity: 0.2,
  alignSelf: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  width: getWindowWidth(),
  shadowOffset: { width: 2, height: 2 },
  backgroundColor: colors.lightGray
});
GComingSoonSeparator.displayName = 'GComingSoonSeparator';
