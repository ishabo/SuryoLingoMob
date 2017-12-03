import { IProgress } from '../reducers';

export const types = {
    SET_PROGRESS: 'profile/SET_PROGRESS',
    ENROLE_COURSE: 'profile/ENROLE_COURSE',
    SET_ACTIVE_COUTSE: 'profile/SET_ACTIVE_COUTSE',
    SET_LESSON_DONE: 'profile/SET_LESSON_DONE',
    SET_MODULE_DONE: 'profile/SET_MODULE_DONE',
    ADD_XP: 'profile/ADD_XP'
}

export const setProgress = (payload: IProgress) => ({
    payload,
    type: types.SET_PROGRESS
});

export const enroleCourse = (courseId: string) => ({
    courseId,
    type: types.ENROLE_COURSE
});

export const setActiveCourse = (courseId: string) => ({
    courseId,
    type: types.SET_ACTIVE_COUTSE
});

export const setLessonDone = (lessonId: string) => ({
    lessonId,
    type: types.SET_LESSON_DONE
});

export const setModuleDone = (moduleId: string) => ({
    moduleId,
    type: types.SET_MODULE_DONE
});

export const addXP = (xp: number) => ({
    xp,
    type: types.ADD_XP
});