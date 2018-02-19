import { call, put, select } from 'redux-saga/effects';
import * as skills from 'services/skills';
import { getActiveCourse } from 'services/selectors';
import { navToSkills } from 'helpers';
import { setLoadingOn, setLoadingOff } from 'services/api/actions';
import * as exceptions from 'services/exceptions';
import { ISagasFunctions } from 'services/sagas';
import { IInitialState } from 'services/reducers';
import * as assets from 'services/assets';

export function* fetchSkills(): IterableIterator<any> {
  yield put(setLoadingOn());
  const activeCourse = yield select(getActiveCourse);

  if (activeCourse) {
    try {
      const response = yield call(skills.api.getSkills, activeCourse.id);
      yield put(skills.actions.saveSkills(response));
      yield put(assets.actions.fetchSkillIcons());
    } catch (error) {
      yield put(exceptions.actions.add(error));
    }
    const profile = yield select((state: IInitialState) => state.profile);
    yield put(navToSkills(profile));
  }

  yield put(setLoadingOff());
}

export const functions = (): ISagasFunctions[] => {
  return [
    { action: skills.actions.types.FETCH_SKILLS, func: fetchSkills },
  ];
};
