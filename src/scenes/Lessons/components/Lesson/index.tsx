import * as React from 'react';
import SkillIcon from 'scenes/Skills/components/SkillIcon';
import { ILesson, ISkill } from 'services/skills';
import I18n from 'I18n';
import Badge from '../Badge';
import {
  GSBadgePosition,
  GSButton,
  GSCard,
  GSLesson,
  GSLessonNewWords,
  GSLessonTitle,
  GSButtonText,
  GSListButton
} from './index.styles';
import { ProgressCircle } from 'components';
import { Icon } from 'native-base';
import { Button } from 'native-base';

interface IProps {
  lesson: ILesson;
  skill: ISkill;
  active: boolean;
  targetLanguage: TLangs;
  sourceLanguage: TLangs;
  enterLesson(lessonId: string): void;
  previewLesson(lessonId: string): void;
}

export default ({ lesson, previewLesson, skill, enterLesson, active, targetLanguage, sourceLanguage }: IProps) => {
  const { lessons } = skill;

  const lessonTitle = I18n.t('lessons.lesson.title', {
    lessonOrder: lesson.order,
    totalLessons: lessons.length
  });

  const lessonProgress = lesson.order / lessons.length;

  const renderBadge = () => (
    <GSBadgePosition>
      <Badge>
        <ProgressCircle size="small" progress={lessonProgress}>
          <SkillIcon size="xhdpi" icon={skill.icon} state="unlocked" />
        </ProgressCircle>
      </Badge>
    </GSBadgePosition>
  );

  const renderListButton = () => (
    <GSListButton>
      <Button
        light
        onPress={() => {
          previewLesson(lesson.id);
        }}
      >
        <Icon type="FontAwesome" name="bars" style={{ fontSize: 20 }} />
      </Button>
    </GSListButton>
  );

  const buttonProps = { rounded: true };
  buttonProps[active ? 'primary' : 'light'] = true;
  const buttonActionText = lesson.finished ? 'retakeLesson' : 'startLesson';
  const buttonText = I18n.t(`lessons.${active ? buttonActionText : 'locked'}`);

  return (
    <GSLesson>
      <GSCard active>
        <GSLessonTitle lang={sourceLanguage}>{lessonTitle}</GSLessonTitle>
        <GSLessonNewWords lang={targetLanguage}>{lesson.newWords.split('|').join(', ')}</GSLessonNewWords>
        <GSButton onPress={() => active && enterLesson(lesson.id)} {...buttonProps}>
          <GSButtonText active={active}>{buttonText}</GSButtonText>
        </GSButton>
      </GSCard>
      {lesson.finished && renderListButton()}
      {lesson.finished && renderBadge()}
    </GSLesson>
  );
};
