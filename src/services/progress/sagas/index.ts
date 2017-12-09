import { put } from 'redux-saga/effects';
import { saveProfile } from '../actions';
import { IProfileAction } from '../reducers';
import { NavigationActions } from 'react-navigation';
import { fetchSkills } from '../../skills/actions';

export default function* switchCourse (action: IProfileAction): IterableIterator<any> {
  try {
    const { courseId } = action;
    yield put(saveProfile({ currentCourse: courseId }));
    yield put(fetchSkills(courseId));
  } catch (error) {
    console.error(error);
  }

  yield put(NavigationActions.navigate({ routeName: 'Skills' }));
}
