const questions = [
	{
		id: '111',
		lessonId: '11',
		questionType: 'WORD_SELECTION',
		studyPhrase: {
			text: 'ܡܢܐ ܥܒܕܬܘܢ',
			soundFile: 'audio_1000_1_2'
		},
		translateTo: 'targetLanguage',
		correctAnswers: ['ماذا تفعلون؟'],
		possibleAnswers: ['ماذا', 'تأكلون', 'تفعلون']
	},

	{
		id: '112',
		lessonId: '11',
		questionType: 'DICTATION',
		studyPhrase: {
			text: 'ܡܢܐ ܥܒܕܬܘܢ',
			soundFile: 'audio_1000_1_2'
		},
		translateTo: 'targetLanguage',
		correctAnswers: ['ܡܢܐ ܥܒܕܬܘܢ'],
		possibleAnswers: ['']
	},
	{
		id: '112',
		lessonId: '11',
		questionType: 'TRANSLATION',
		studyPhrase: {
			text: 'ܒܪܝܟ ܨܦܪܟ ܐܚܝ',
			soundFile: 'audio_1000_1_1'
		},
		translateTo: 'targetLanguage',
		correctAnswers: ['طاب صباحك يا أخي', 'صباح الخير يا أخي', 'مبارك صباحك يا أخي'],
		possibleAnswers: []
	},
]

const lessons = [
	{
		id: '11',
		moduleId: '1',
		newWords: ['ܐܪܝܐ', 'ܨܦܪܟ', 'ܐܚܘܢ', 'ܛܘܒ', 'ܡܢܐ'],
		questions
	},
	{
		id: '12',
		moduleId: '1',
		newWords: ['ܥܒܕ', 'ܫܠܝܡ', 'ܐܝܬ', 'ܒܝܬܐ', 'ܠܚܡܐ'],
		questions
	}
];

export const modules = [
	{
		id: '1',
		courseId: 'arc-syc',
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
		id: '2',
		courseId: 'arc-syc',
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
		id: '3',
		courseId: 'arc-syc',
		level: 2,
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
		id: '3',
		courseId: 'arc-syc',
		level: 2,
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
		id: '5',
		courseId: 'arc-syc',
		level: 3,
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
		id: '6',
		courseId: 'arc-syc',
		level: 3,
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
		id: '7',
		courseId: 'arc-syc',
		level: 4,
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
		id: '8',
		courseId: 'arc-syc',
		level: 4,
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
		id: '9',
		courseId: 'arc-syc',
		level: 5,
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
		id: '10',
		courseId: 'arc-syc',
		level: 5,
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
		id: '11',
		courseId: 'arc-syc',
		level: 5,
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
		id: '12',
		courseId: 'arc-syc',
		level: 6,
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
		id: '13',
		courseId: 'arc-syc',
		level: 6,
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
		id: '14',
		courseId: 'arc-syc',
		level: 7,
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
		id: '15',
		courseId: 'arc-syc',
		level: 7,
		unit: 3,
		name: 'religion',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	},
	{
		id: '16',
		courseId: 'arc-syc',
		level: 8,
		unit: 3,
		name: 'adjective1',
		lessons,
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	}
]

export default modules;