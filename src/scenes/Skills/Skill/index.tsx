import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import glamor from 'glamorous-native';
import { ISkill } from '../../../services/skills/reducers';
import images from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';

export interface Props {
  onSkillsClick: () => void;
  skillData: ISkill;
}

export interface State { }

export default class skill extends React.Component<Props, State> {
  render () {
    const { name } = this.props.skillData;
    const LinearGradientProps = {
      colors: ['#E8B926', 'transparent'],
      start: { x: 0, y: 0.4 },
      end: { x: 0, y: 0 },
      locations: [0, 0],
    };
    return (
      <GSSkills>
        <TouchableOpacity onPress={this.props.onSkillsClick}>
          {/* <View style={{
            backgroundColor: 'white',
            height: 40, width: 85,
            top: 55,
            position: 'absolute',
            left: 15,
          }}></View> */}
          <Image style={{ height: 120, width: 120 }} source={images.skills.bg.unlocked} />
          <GSCircle {...LinearGradientProps} >
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
