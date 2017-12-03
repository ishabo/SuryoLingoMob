import { IProfile } from '../reducers';

export const types = {
  SAVE_PROFILE: 'profile/SAVE_PROFILE',
  FETCH_PROFILE: 'profile/FETCH_PROFILE',
  SWITCH_COURSE: 'profile/SWITCH_COURSE',
};

export const saveProfile = (payload: IProfile[]) => ({
  payload,
  type: types.SAVE_PROFILE,
});

export const switchCourse = (courseId: string) => ({
  courseId,
  type: types.SAVE_PROFILE,
});

