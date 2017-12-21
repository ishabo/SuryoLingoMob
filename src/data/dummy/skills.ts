import { ISkill, ILesson } from '../../services/skills/reducers';

const lessons: ILesson[] = [
  {
    id: '11',
    order: 1,
    newWords: ['ܐܪܝܐ', 'ܨܦܪܟ', 'ܐܚܘܢ', 'ܛܘܒ', 'ܡܢܐ'].join('|'),
  },
  {
    id: '12',
    order: 2,
    newWords: ['ܥܒܕ', 'ܫܠܝܡ', 'ܐܝܬ', 'ܒܝܬܐ', 'ܠܚܡܐ'].join('|'),
  },
];

const icons = {
  hdpi: { locked: '', unlocked: '' },
  mdpi: { locked: '', unlocked: '' },
  xhdpi: { locked: '', unlocked: '' },
  xxhdpi: { locked: '', unlocked: '' },
  xxxhdpi: { locked: '', unlocked: '' },
};

export const skills: ISkill[] = [
  {
    icons,
    lessons,
    id: '1',
    unit: 1,
    description: '',
    name: 'letters1',
  },
  {
    icons,
    lessons,
    id: '2',
    unit: 1,
    description: '',
    name: 'letters2',
  },
  {
    icons,
    lessons,
    id: '3',
    unit: 2,
    description: '',
    name: 'vowels',
  },
  {
    icons,
    lessons,
    id: '4',
    unit: 2,
    description: '',
    name: 'basics',
  },
];

