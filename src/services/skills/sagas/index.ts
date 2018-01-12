import { call, put, select } from 'redux-saga/effects';
import * as skills from 'services/skills';
import { getActiveCourse } from 'services/selectors';
import { navToSkills } from 'helpers';
import { setLoadingOn, setLoadingOff } from 'services/api/actions';
import * as exceptions from 'services/exceptions';
import { ISagasFunctions } from 'services/sagas';

export function* fetchSkills(): IterableIterator<any> {
  yield put(setLoadingOn());
  try {
    const course = yield select(getActiveCourse);
    const response = yield call(skills.api.getSkills, course.id);
    yield put(skills.actions.saveSkills(response));
    yield put(navToSkills(course));
  } catch (error) {
    yield put(exceptions.actions.add(error));
  }

  yield put(setLoadingOff());
}

export const functions = (): ISagasFunctions[] => {
  return [
    { action: skills.actions.types.FETCH_SKILLS, func: fetchSkills },
  ];
};
