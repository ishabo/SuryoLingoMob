import { ICourse } from '../../services/courses/reducers';

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
    learnersLanguage: {
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
      shortName: 'tor-syr',
      fullName: 'Toroyo Syriac',
    },
    learnersLanguage: {
      id: 'lang-id2',
      name: 'العربية',
      shortName: 'cl-ara',
      fullName: 'Classical Arabic',
    },
  },
];

export default courses;
