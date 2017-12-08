const lessons = [
  {
    id: '11',
    skillId: '1',
    newWords: ['ܐܪܝܐ', 'ܨܦܪܟ', 'ܐܚܘܢ', 'ܛܘܒ', 'ܡܢܐ'],
  },
  {
    id: '12',
    skillId: '1',
    newWords: ['ܥܒܕ', 'ܫܠܝܡ', 'ܐܝܬ', 'ܒܝܬܐ', 'ܠܚܡܐ'],
  },
];

export const skills = [
  {
    id: '1',
    courseId: 'arc-syc',
    unit: 1,
    name: 'letters1',
    lessons,
    icon: 'numbers',
  },
  {
    id: '2',
    courseId: 'arc-syc',
    unit: 1,
    name: 'letters2',
    lessons,
    icon: 'numbers',
  },
  {
    id: '3',
    courseId: 'arc-syc',
    unit: 2,
    name: 'vowels',
    lessons,
    icon: 'numbers',
  },
  {
    id: '4',
    courseId: 'arc-syc',
    unit: 2,
    name: 'basics',
    lessons,
    icon: 'numbers',
  },
];

export default skills;
