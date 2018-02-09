import React from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';
import SkillIcon from 'scenes/Skills/components/SkillIcon';
import { ILesson, ISkill } from 'services/skills';

import I18n from 'I18n';
import Colors from 'styles/colors';
import Badge from '../Badge';
import glamor from 'glamorous-native';
import { GSCustomText } from 'styles/text';

interface IProps {
  lesson: ILesson;
  skill: ISkill;
  active: boolean;
  lang: TLangs;
  enterLesson (lessonId: string): void;
}

export default ({ lesson, skill, enterLesson, active, lang }: IProps) => {
  const { lessons } = skill;
  const icon = skill.icons.xhdpi.unlocked;
  const lessonTitle = I18n.t('lessons.lesson.title', {
    lessonOrder: lesson.order, totalLessons: lessons.length,
  });

  const renderBadge = () => <GSBadgePosition>
    <Badge>
      <GSSkillIcon>
        <SkillIcon size={80} icon={icon} />
      </GSSkillIcon>
    </Badge>
  </GSBadgePosition>;

  const buttonProps = { rounded: true };
  buttonProps[active ? 'primary' : 'light'] = true;

  return <GSLesson>
    <GSCard active>
      <GSLessonTitle>{lessonTitle}</GSLessonTitle>
      <GSLessonNewWords lang={lang}>{lesson.newWords.split('|').join(', ')}</GSLessonNewWords>
      <GSButton onPress={() => active && enterLesson(lesson.id)} {...buttonProps}>
        <Text style={{ color: active ? Colors.white : Colors.gray }}>
          {I18n.t(`lessons.${active ? 'enterLesson' : 'locked'}`)}
        </Text>
      </GSButton>
    </GSCard>
    {lesson.finished && renderBadge()}
  </GSLesson>;
};

const GSLesson = glamor.view({
  height: 300,
  width: 300,
});

const GSButton = glamor(Button)({
  marginTop: 10,
  alignSelf: 'center',
  padding: 10,
  paddingHorizontal: 30,
  position: 'absolute',
  bottom: 30,
});

const GSCard = glamor.view<{ active: boolean }>(
  {
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignContent: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: 280,
    height: 220,
    marginLeft: 5,
  },
  props => ({
    backgroundColor: props.active === true ? Colors.white : Colors.lightGray,
  }),
);

const GSLessonTitle = glamor.text({
  alignSelf: 'center',
  fontSize: 24,
  position: 'absolute',
  top: 50,
});

const GSLessonNewWords = glamor(GSCustomText)({
  alignSelf: 'center',
  fontSize: 20,
});

const GSSkillIcon = glamor.view({
  backgroundColor: Colors.lightYellow,
  position: 'absolute',
  borderRadius: 50,
  height: 65,
  width: 65,
  right: 8,
  top: 8,
});

const GSBadgePosition = glamor.view({
  position: 'absolute',
  bottom: 80,
  right: 0,
});
