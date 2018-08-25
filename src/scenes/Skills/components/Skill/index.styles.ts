import { Image } from 'react-native';
import glamor from 'glamorous-native';

export const GSBackground = glamor(Image as any)({
  height: 120,
  width: 120
}) as any;

export const GSSkill = glamor.view({
  flexDirection: 'column',
  marginTop: 20,
  alignContent: 'center'
});

export const GSSkillTitle = glamor.text({
  alignSelf: 'center',
  marginTop: 10
});
