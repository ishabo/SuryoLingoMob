import { IProfile } from '../reducers';

export const types = {
  SAVE_PROFILE: 'profile/SAVE_PROFILE',
  FETCH_PROFILE: 'profile/FETCH_PROFILE',
};

export const saveProfile = (payload: IProfile[]) => ({
  payload,
  type: types.SAVE_PROFILE,
});
