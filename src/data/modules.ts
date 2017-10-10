type TQuestionType = string | 'TRANSLATION' | 'WORD_SELECTION' | 'MULTI_CHOICE' | 'PICTURE_SELETION' | 'DICTATION';

interface IQuestion {
	questionType: TQuestionType;
	sound: string;
	main: string;
	meaning: string[];
}

type ILesson = IQuestion[];

export interface IModule {
	id: number;
	level: number;
	unit: number;
	name: string;
	lessons: ILesson[];
	icons: {
		inactive: string;
		active: string;
		completed: string;
	},
};

const lesson = [
	{
		questionType: 'TRANSLATION',
		sound: '1000_1_1',
		main: 'ܒܪܝܟ ܨܦܪܟ ܐܚܝ',
		meaning: ['طاب صباحك يا أخي', 'صباح الخير يا أخي', 'مبارك صباحك يا أخي'],
	},
	{
		questionType: 'WORD_SELECTION',
		sound: '1000_1_1',
		main: 'ܡܢܐ ܥܒܕܬܘܢ',
		meaning: ['ماذا تفعلون؟', 'ما الذي تفعلون؟', 'ما الذي تفعلونه؟'],
	}

];

const lessons = [lesson, lesson];
const modules: IModule[] = [
	{
		id: 10000,
		level: 1,
		unit: 1,
		name: 'letters1',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	},
	{
		id: 10001,
		level: 1,
		unit: 1,
		name: 'letters2',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	},
	{
		id: 10002,
		level: 1,
		unit: 2,
		name: 'vowels',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	},
	{
		id: 1,
		level: 1,
		unit: 2,
		name: 'basics',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	},
	{
		id: 10003,
		level: 1,
		unit: 2,
		name: 'phrases',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	},
	{
		id: 10004,
		level: 1,
		unit: 3,
		name: 'genders',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	},
	{
		id: 10005,
		level: 1,
		unit: 3,
		name: 'numbers',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	},
	{
		id: 10006,
		level: 1,
		unit: 3,
		name: 'plural',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	},
	{
		id: 10007,
		level: 1,
		unit: 4,
		name: 'body_parts',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	},
	{
		id: 10008,
		level: 2,
		unit: 1,
		name: 'animals',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	},
	{
		id: 10009,
		level: 2,
		unit: 1,
		name: 'present1',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	},
	{
		id: 10010,
		level: 2,
		unit: 2,
		name: 'colors',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	},
	{
		id: 10011,
		level: 2,
		unit: 2,
		name: 'shopping',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	},
	{
		id: 10012,
		level: 2,
		unit: 3,
		name: 'places',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	},
	{
		id: 10013,
		level: 2,
		unit: 3,
		name: 'religion',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	}
]

export default modules;