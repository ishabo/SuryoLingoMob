import { IProfile, IProfilePayload, IFetchedProfileData } from '../';

const namespace = 'SuryoLingo/profile';

export const types = {
  SAVE_PROFILE: `${namespace}/SAVE_PROFILE`,
  SAVE_PROFILE_AND_ACCESS_TOKEN: `${namespace}/SAVE_PROFILE_AND_ACCESS_TOKEN`,
  FETCH_PROFILE: `${namespace}/FETCH_PROFILE`,
  CREATE_PROFILE_IF_NEEDED: `${namespace}/CREATE_PROFILE_IF_NEEDED`,
  CREATE_PROFILE: `${namespace}/CREATE_PROFILE`,
  UPDATE_PROFILE: `${namespace}/UPDATE_PROFILE`,
  RESET_PROFILE: `${namespace}/RESET_PROFILE`
};

export const saveProfile = (data: IProfile) => ({
  data,
  type: types.SAVE_PROFILE
});

export const createProfileIfNeeded = (payload?: IProfilePayload) => ({
  payload,
  type: types.CREATE_PROFILE_IF_NEEDED
});

export const createProfile = (payload: IProfilePayload) => ({
  payload,
  type: types.CREATE_PROFILE
});

export const updateProfile = (payload: IProfilePayload) => ({
  payload,
  type: types.UPDATE_PROFILE
});

export const saveProfileAndAccessToken = (profileData: IFetchedProfileData) => ({
  profileData,
  type: types.SAVE_PROFILE_AND_ACCESS_TOKEN
});

export const fetchProfile = () => ({
  type: types.FETCH_PROFILE
});

export const resetProfile = () => ({
  type: types.RESET_PROFILE
});
