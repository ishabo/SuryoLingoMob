import * as React from 'react';
import SkillIcon from 'scenes/Skills/components/SkillIcon';
import I18n from 'I18n';
import Badge from '../Badge';
import { GSBadgePosition, GSButton, GSCard, GSLesson, GSLessonNewWords, GSLessonTitle, GSButtonText, GSListButton } from './index.styles';
import { ProgressCircle } from 'components';
import { Icon } from 'native-base';
import { ActivityIndicator } from 'react-native';
import colors from 'styles/colors';
export default ({ lesson, previewLesson, skill, enterLesson, active, targetLanguage, sourceLanguage, loading }) => {
    const { lessons } = skill;
    const lessonTitle = I18n.t('lessons.lesson.title', {
        lessonOrder: lesson.order,
        totalLessons: lessons.length
    });
    const lessonProgress = lesson.order / lessons.length;
    const renderBadge = () => (React.createElement(GSBadgePosition, null,
        React.createElement(Badge, null,
            React.createElement(ProgressCircle, { size: "small", progress: lessonProgress },
                React.createElement(SkillIcon, { size: "xhdpi", icon: skill.icon, state: "unlocked" })))));
    const renderListButton = () => (React.createElement(GSListButton, { light: true, onPress: () => {
            previewLesson(lesson.id);
        } },
        React.createElement(Icon, { type: "FontAwesome", name: "bars", style: { color: 'black', fontSize: 20 } })));
    const buttonProps = { rounded: true };
    buttonProps[active ? 'primary' : 'light'] = true;
    const buttonActionText = lesson.finished ? 'retakeLesson' : 'startLesson';
    const buttonText = I18n.t(`lessons.${active ? buttonActionText : 'locked'}`);
    return (React.createElement(GSLesson, null,
        React.createElement(GSCard, { active: true },
            React.createElement(GSLessonTitle, { lang: sourceLanguage }, lessonTitle),
            React.createElement(GSLessonNewWords, { lang: targetLanguage }, lesson.newWords.split('|').join(', ')),
            React.createElement(GSButton, Object.assign({ onPress: () => active && enterLesson(lesson.id) }, buttonProps), loading ? (React.createElement(ActivityIndicator, { size: "large", color: colors.lightGray })) : (React.createElement(GSButtonText, { active: active }, buttonText)))),
        lesson.finished && renderListButton(),
        lesson.finished && renderBadge()));
};
//# sourceMappingURL=index.js.map