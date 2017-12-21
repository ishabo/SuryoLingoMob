import React from 'react';
import { TouchableOpacity } from 'react-native';
import SkillIcon from '../../../Skills/components/SkillIcon';
import { ILesson, ISkill } from '../../../../services/skills/reducers';
import I18n from '../../../../i18n';
import Colors from '../../../../styles/colors';
import Badge from '../Badge';
import glamor from 'glamorous-native';

interface IProps {
  lesson: ILesson;
  skill: ISkill;
  active: boolean;
  enterLesson (lessonId: string): void;
}

export default ({ lesson, skill, enterLesson, active }: IProps) => {
  const { lessons } = skill;
  const icon = skill.icons.xhdpi.unlocked;
  const lessonTitle = I18n.t('lessons.lesson.title', {
    lessonOrder: lesson.order, totalLessons: lessons.length,
  });

  return <GSCard
    style={{ backgroundColor: active === true ? Colors.white : Colors.lightGray }}
    onPress={() => active && enterLesson(lesson.id)}>
    <GSLessonTitle>{lessonTitle}</GSLessonTitle>
    {lesson.finished && <GSBadgePosition>
      <Badge>
        <GSSkillIcon>
          <SkillIcon icon={icon} />
        </GSSkillIcon>
      </Badge>
    </GSBadgePosition>}
    <GSLessonNewWords>{lesson.newWords.split('|').join(', ')}</GSLessonNewWords>
  </GSCard>;
};

const GSCard = glamor(TouchableOpacity)({
  alignItems: 'center',
  height: 300,
  shadowOffset: { width: 4, height: 4 },
  shadowColor: 'black',
  shadowOpacity: 0.2,
  elevation: 1,
  shadowRadius: 2,
  alignContent: 'stretch',
  justifyContent: 'center',
  width: 300,
});

const GSLessonTitle = glamor.text({
  alignSelf: 'center',
  fontSize: 20,
  marginBottom: 10,
});

const GSLessonNewWords = glamor.text({
  alignSelf: 'center',
});

const GSSkillIcon = glamor.view({
  backgroundColor: Colors.lightYellow,
  borderRadius: 50, width: 80,
  height: 80,
  zIndex: 1000,
  position: 'absolute',
  top: 10,
  right: 10,
});

const GSBadgePosition = glamor.view({
  position: 'absolute',
  bottom: 2,
  right: 10,
  width: 100,
});
