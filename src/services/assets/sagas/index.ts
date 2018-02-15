import { call, put } from 'redux-saga/effects';
import * as assets from 'services/assets';
import { ISagasFunctions } from 'services/sagas';

export function* fetchSkillIcons (): IterableIterator<any> {
  const icons = yield call(assets.api.getSkillIcons);
  yield put(assets.actions.setSkillIcons(icons));
}

export const functions = (): ISagasFunctions[] => {
  return [
    { action: assets.actions.types.FETCH_SKILL_ICONS, func: fetchSkillIcons },
  ];
};
