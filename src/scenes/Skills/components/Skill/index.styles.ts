import { Image } from 'react-native';
import glamor from 'glamorous-native';

export const GSBackground = glamor(Image)({
  height: 120,
  width: 120
});

export const GSSkill = glamor.view({
  flexDirection: 'column',
  marginTop: 20,
  alignContent: 'center'
});

export const GSSkillTitle = glamor.text({
  alignSelf: 'center',
  marginTop: 10
});
