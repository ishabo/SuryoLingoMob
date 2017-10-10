interface IModule {
	id: number;
	level: number;
	unit: number;
	name: string;
	icons: {
		inactive: string;
		active: string;
		completed: string;
	},
};

const modules: IModule[] = [
	{
		id: 10000,
		level: 1,
		unit: 1,
		name: 'letters1',
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
		icons: {
			inactive: '',
			active: '',
			completed: '',
		},
	}
]