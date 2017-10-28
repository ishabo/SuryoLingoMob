import { setProgress, enroleCourse, setActiveCourse, setLessonDone, setModuleDone, addXP, types } from '../actions';

describe('courses actions', () => {

    describe('setProgress', () => {
        it('renders type with payload', () => {
            const payload = {
                enrolledCourses: ['course-ID-1', 'course-ID-2'],
                activeCourse: 'course-ID-2',
                finishedModules: ['module-ID-1'],
                finishedLessons: ['lesson-ID-1', 'lesson-ID-2']
            }
            expect(setProgress(payload)).toEqual({
                type: types.SET_PROGRESS,
                payload
            });
        });
    });

    describe('enroleCourse', () => {
        it('renders type with payload', () => {
            const courseId = 'course-id';
            expect(enroleCourse(courseId)).toEqual({
                type: types.ENROLE_COURSE,
                courseId
            });
        });
    });

    describe('setActiveCourse', () => {
        it('renders type with payload', () => {
            const courseId = 'course-id';
            expect(setActiveCourse(courseId)).toEqual({
                type: types.SET_ACTIVE_COUTSE,
                courseId
            });
        });
    });

    describe('setLessonDone', () => {
        it('renders type with payload', () => {
            const lessonId = 'lesson-id';
            expect(setLessonDone(lessonId)).toEqual({
                type: types.SET_LESSON_DONE,
                lessonId
            });
        });
    });

    describe('setModuleDone', () => {
        it('renders type with payload', () => {
            const moduleId = 'module-id';
            expect(setModuleDone(moduleId)).toEqual({
                type: types.SET_MODULE_DONE,
                moduleId
            });
        });
    });

    describe('addXP', () => {
        it('renders type with payload', () => {
            const xp = 10;
            expect(addXP(xp)).toEqual({
                type: types.ADD_XP,
                xp
            });
        });
    });
});