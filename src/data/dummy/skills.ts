import { ISkill, ILesson } from 'services/skills';

const lessons: ILesson[] = [
  {
    id: '11',
    order: 1,
    newWords: ['ܐܪܝܐ', 'ܨܦܪܟ', 'ܐܚܘܢ', 'ܛܘܒ', 'ܡܢܐ'].join('|')
  },
  {
    id: '12',
    order: 2,
    newWords: ['ܥܒܕ', 'ܫܠܝܡ', 'ܐܝܬ', 'ܒܝܬܐ', 'ܠܚܡܐ'].join('|')
  }
];

export const skills: ISkill[] = [
  {
    lessons,
    id: '1',
    unit: 1,
    description: '',
    icon: 'letters1',
    name: 'letters1',
    isComingSoon: true
  },
  {
    lessons,
    id: '2',
    unit: 1,
    description: '',
    icon: 'letters2',
    name: 'letters2',
    isComingSoon: true
  },
  {
    lessons,
    id: '3',
    unit: 2,
    description: '',
    icon: 'vowels',
    name: 'vowels',
    isComingSoon: true
  },
  {
    lessons,
    id: '4',
    unit: 2,
    description: '',
    icon: 'basics',
    name: 'basics',
    isComingSoon: true
  }
];
