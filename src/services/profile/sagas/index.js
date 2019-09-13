import { call, put, select } from 'redux-saga/effects';
import * as profile from 'services/profile';
import { isEmpty } from 'lodash';
import { setAccessToken } from 'services/api/access';
import { isRegistered } from 'services/selectors';
import { Analytics, Crashlytics } from 'config/firebase';
export function* createProfileIfNeeded(action) {
    const profileState = yield select((state) => state.profile);
    if (isEmpty(profileState)) {
        yield put(profile.actions.createProfile(action.payload));
    }
    else {
        yield put(profile.actions.fetchProfile());
    }
}
export function* createProfile(action) {
    try {
        const profileData = yield call(profile.api.createProfile, action.payload);
        yield put(profile.actions.saveProfileAndAccessToken(profileData));
    }
    catch (error) {
        console.log(error);
    }
}
export function* updateProfile(action) {
    const currentProfile = yield select((state) => state.profile);
    const profileData = yield call(profile.api.updateProfile(currentProfile.id), action.payload);
    yield put(profile.actions.saveProfileAndAccessToken(profileData));
}
export function* fetchProfile() {
    const userIsRegistered = yield select(isRegistered);
    if (userIsRegistered) {
        try {
            const profileData = yield call(profile.api.getUser);
            yield put(profile.actions.saveProfileAndAccessToken(profileData));
        }
        catch (error) {
            console.warn(JSON.stringify(error));
        }
    }
}
export function* saveProfileAndAccessToken(action) {
    try {
        const accessToken = action.profileData.apiKey;
        delete action.profileData.apiKey;
        yield call(setAccessToken, accessToken);
        const { id, userXp } = action.profileData;
        Analytics.setUserId(id);
        if (userXp) {
            Analytics.setUserProperty('userXp', String(userXp));
        }
        Analytics.setUserId(action.profileData.id);
        Crashlytics.setUserIdentifier(action.profileData.id);
        Crashlytics.setStringValue('userName', action.profileData.name);
        Crashlytics.setStringValue('userEmail', action.profileData.email);
        yield put(profile.actions.saveProfile(action.profileData));
    }
    catch (e) {
        console.warn(e.message);
    }
}
export const functions = () => {
    const types = profile.actions.types;
    return [
        { action: types.CREATE_PROFILE_IF_NEEDED, func: createProfileIfNeeded },
        { action: types.CREATE_PROFILE, func: createProfile },
        { action: types.UPDATE_PROFILE, func: updateProfile },
        { action: types.FETCH_PROFILE, func: fetchProfile },
        {
            action: types.SAVE_PROFILE_AND_ACCESS_TOKEN,
            func: saveProfileAndAccessToken
        }
    ];
};
//# sourceMappingURL=index.js.map