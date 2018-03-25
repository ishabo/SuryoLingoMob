import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import images from 'assets/images';
import SkillIcon from '../SkillIcon';
import Colors from 'styles/colors';
import { GSBackground, GSCircle, GSSkills, GSSkillsTitle } from './index.styles';

export interface IProps {
  onSkillsClick: () => void;
  name: string;
  icon: string;
  progress: number;
  unlocked: boolean;
}

export default (props: IProps) => {

  const { name, unlocked, progress, icon, onSkillsClick } = props;
  const filling = unlocked ? 1 - progress : 1;

  const LinearGradientProps = {
    colors: ['transparent', Colors.darkYellow],
    locations: [filling, 0],
  };

  const imageState = unlocked ? 'unlocked' : 'locked';

  return (
    <GSSkills>
      <TouchableOpacity onPress={onSkillsClick}>
        <GSBackground source={images.skills.bg[imageState]} />
        <GSCircle {...LinearGradientProps} >
          <SkillIcon icon={icon} state={imageState} />
        </GSCircle>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSkillsClick}>
        <GSSkillsTitle>
          {name}
        </GSSkillsTitle>
      </TouchableOpacity>
    </GSSkills>
  );
};

