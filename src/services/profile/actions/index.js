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
export const saveProfile = (data) => ({
    data,
    type: types.SAVE_PROFILE
});
export const createProfileIfNeeded = (payload) => ({
    payload,
    type: types.CREATE_PROFILE_IF_NEEDED
});
export const createProfile = (payload) => ({
    payload,
    type: types.CREATE_PROFILE
});
export const updateProfile = (payload) => ({
    payload,
    type: types.UPDATE_PROFILE
});
export const saveProfileAndAccessToken = (profileData) => ({
    profileData,
    type: types.SAVE_PROFILE_AND_ACCESS_TOKEN
});
export const fetchProfile = () => ({
    type: types.FETCH_PROFILE
});
export const resetProfile = () => ({
    type: types.RESET_PROFILE
});
//# sourceMappingURL=index.js.map