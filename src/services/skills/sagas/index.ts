import { call, put, select } from 'redux-saga/effects';
import * as skills from 'services/skills';
import { getActiveCourse } from 'services/selectors';
import { navToSkills } from 'helpers';
import { setLoadingOn, setLoadingOff } from 'services/api/actions';
import * as exceptions from 'services/exceptions';
import { ISagasFunctions } from 'services/sagas';
import { IInitialState } from 'services/reducers';

export function* fetchSkills (): IterableIterator<any> {
  yield put(setLoadingOn());
  const course = yield select(getActiveCourse);

  if (course) {
    try {
      const response = yield call(skills.api.getSkills, course.id);
      yield put(skills.actions.saveSkills(response));
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
