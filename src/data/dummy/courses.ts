import { ICourse } from 'services/courses';

const courses: ICourse[] = [
  {
    id: 'course-1',
    enrolled: false,
    active: false,
    targetLanguage: {
      id: 'lang-id1',
      name: 'ܣܘܖܝܝܐ',
      shortName: 'cl-syr',
      fullName: 'Classical Syriac',
    },
    sourceLanguage: {
      id: 'lang-id2',
      name: 'العربية',
      shortName: 'cl-ara',
      fullName: 'Classical Arabic',
    },
  },
  {
    id: 'course-2',
    enrolled: false,
    active: false,
    targetLanguage: {
      id: 'lang-id3',
      name: 'ܛܘܪܝܐ',
      shortName: 'tur-syr',
      fullName: 'Toroyo Syriac',
    },
    sourceLanguage: {
      id: 'lang-id2',
      name: 'العربية',
      shortName: 'cl-ara',
      fullName: 'Classical Arabic',
    },
  },
];

export default courses;
