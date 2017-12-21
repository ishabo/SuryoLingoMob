import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import glamor from 'glamorous-native';
import images from '../../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import SkillIcon from '../SkillIcon';
import Colors from '../../../../styles/colors';

export interface IProps {
  onSkillsClick: () => void;
  name: string;
  icon: string;
  progress: number;
  unlocked: boolean;
}

export default class skill extends React.Component<IProps> {
  render () {
    const { name, unlocked, progress, icon } = this.props;
    const filling = unlocked ? 1 - progress : 1;
    const LinearGradientProps = {
      colors: [Colors.yellow, 'transparent'],
      start: { x: 0, y: filling },
      end: { x: 0, y: 0 },
      locations: [0, 0],
    };
    const image = unlocked ? 'unlocked' : 'locked';
    return (
      <GSSkills>
        <TouchableOpacity onPress={this.props.onSkillsClick}>
          <GSBackground source={images.skills.bg[image]} />
          <GSCircle {...LinearGradientProps} >
            <SkillIcon icon={icon} />
          </GSCircle>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onSkillsClick}>
          <GSSkillsTitle>
            {name}
          </GSSkillsTitle>
        </TouchableOpacity>
      </GSSkills>
    );
  }
}

const GSBackground = glamor(Image)({
  height: 120,
  width: 120,
});

const GSSkills = glamor.view({
  flexDirection: 'column',
  marginTop: 20,
  alignContent: 'center',
});

const GSSkillsTitle = glamor.text({
  alignSelf: 'center',
  marginTop: 10,
});

const GSCircle = glamor(LinearGradient)({
  width: 85.3,
  height: 85,
  borderRadius: 50,
  position: 'absolute',
  bottom: 26.2,
  left: 15.6,
});
