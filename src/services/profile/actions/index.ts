import { IProfile } from '../reducers';

const namespace = 'SuryoLingo/profile';
export const types = {
  SAVE_PROFILE: `${namespace}/SAVE_PROFILE`,
  FETCH_PROFILE: `${namespace}/FETCH_PROFILE`,
  SWITCH_COURSE: `${namespace}/SWITCH_COURSE`,
};

export const saveProfile = (payload: Partial<IProfile>) => ({
  payload,
  type: types.SAVE_PROFILE,
});

export const switchCourse = (courseId: string) => ({
  courseId,
  type: types.SWITCH_COURSE,
});
