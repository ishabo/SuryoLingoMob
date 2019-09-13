import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import images from 'assets/images';
import SkillIcon from '../SkillIcon';
import { GSBackground, GSSkill, GSSkillTitle } from './index.styles';
import { ProgressCircle } from 'components';
import Colors from 'styles/colors';
export default (props) => {
    const { name, unlocked, progress, icon, onSkillsClick, inactive } = props;
    const imageState = unlocked ? 'unlocked' : 'locked';
    return (React.createElement(GSSkill, null,
        React.createElement(TouchableOpacity, { onPress: onSkillsClick },
            React.createElement(GSBackground, { source: images.skills.bg[imageState] }),
            React.createElement(ProgressCircle, { backgroundColor: inactive ? Colors.lightGray : Colors.lightYellow, size: "large", progress: unlocked ? progress : 0 },
                React.createElement(SkillIcon, { icon: icon, state: imageState }))),
        React.createElement(TouchableOpacity, { onPress: onSkillsClick },
            React.createElement(GSSkillTitle, null, name))));
};
//# sourceMappingURL=index.js.map