import { IProfile } from '../reducers';

const namespace = 'SuryoLingo/profile';
export const types = {
  SAVE_PROFILE: `${namespace}/SAVE_PROFILE`,
  FETCH_PROFILE: `${namespace}/FETCH_PROFILE`,
};

export const saveProfile = (payload: Partial<IProfile>) => ({
  payload,
  type: types.SAVE_PROFILE,
});
