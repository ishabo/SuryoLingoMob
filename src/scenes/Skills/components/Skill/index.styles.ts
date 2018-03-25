import { Image } from 'react-native';
import glamor from 'glamorous-native';
import LinearGradient from 'react-native-linear-gradient';

export const GSBackground: any = glamor(Image)({
    height: 120,
    width: 120,
});

export const GSSkills: any = glamor.view({
    flexDirection: 'column',
    marginTop: 20,
    alignContent: 'center',
});

export const GSSkillsTitle: any = glamor.text({
    alignSelf: 'center',
    marginTop: 10,
});

export const GSCircle: any = glamor(LinearGradient)({
    width: 85.3,
    height: 85,
    borderRadius: 50,
    position: 'absolute',
    bottom: 26.2,
    left: 15.6,
});