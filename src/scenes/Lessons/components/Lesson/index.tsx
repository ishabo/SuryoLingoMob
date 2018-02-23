import React from 'react';
import SkillIcon from 'scenes/Skills/components/SkillIcon';
import { ILesson, ISkill } from 'services/skills';
import I18n from 'I18n';
import Badge from '../Badge';
import {
  GSBadgePosition, GSButton, GSCard, GSLesson,
  GSLessonNewWords, GSLessonTitle, GSSkillIcon, GSButtonText,
} from './index.styles';

interface IProps {
  lesson: ILesson;
  skill: ISkill;
  active: boolean;
  targetLanguage: TLangs;
  learnersLanguage: TLangs;
  enterLesson (lessonId: string): void;
}

export default ({ lesson, skill, enterLesson, active, targetLanguage, learnersLanguage }: IProps) => {
  const { lessons } = skill;

  const lessonTitle = I18n.t('lessons.lesson.title', {
    lessonOrder: lesson.order, totalLessons: lessons.length,
  });

  const renderBadge = () => <GSBadgePosition>
    <Badge>
      <GSSkillIcon>
        <SkillIcon size="xhdpi" icon={skill.icon} state="unlocked" />
      </GSSkillIcon>
    </Badge>
  </GSBadgePosition>;

  const buttonProps = { rounded: true };
  buttonProps[active ? 'primary' : 'light'] = true;

  return <GSLesson>
    <GSCard active>
      <GSLessonTitle lang={learnersLanguage}>{lessonTitle}</GSLessonTitle>
      <GSLessonNewWords lang={targetLanguage}>{lesson.newWords.split('|').join(', ')}</GSLessonNewWords>
      <GSButton onPress={() => active && enterLesson(lesson.id)} {...buttonProps}>
        <GSButtonText active={active} >
          {I18n.t(`lessons.${active ? 'enterLesson' : 'locked'}`)}
        </GSButtonText>
      </GSButton>
    </GSCard>
    {lesson.finished && renderBadge()}
  </GSLesson>;
};
