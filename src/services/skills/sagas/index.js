import { call, put, select } from 'redux-saga/effects';
import * as skills from 'services/skills';
import { getActiveCourse } from 'services/selectors';
import * as exceptions from 'services/exceptions';
import * as assets from 'services/assets';
import { setLoadingOn, setLoadingOff } from 'services/api/actions';
export function* fetchSkills() {
    const activeCourse = yield select(getActiveCourse);
    if (activeCourse) {
        yield put(setLoadingOn());
        try {
            const response = yield call(skills.api.getSkills, activeCourse.id);
            yield put(skills.actions.saveSkills(response));
            yield put(assets.actions.fetchSkillIcons());
        }
        catch (error) {
            yield put(exceptions.actions.add(error));
        }
        yield put(setLoadingOff());
    }
}
export const functions = () => [{ action: skills.actions.types.FETCH_SKILLS, func: fetchSkills }];
//# sourceMappingURL=index.js.map