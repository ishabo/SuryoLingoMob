import { IAppSettings } from '../';

const namespace = 'SuryoLingo/settings';

export const types = {
  SAVE_SETTINGS: `${namespace}/SAVE_SETTINGS`,
  FETCH_SETTINGS: `${namespace}/FETCH_SETTINGS`,
  CHECK_STATUS: `${namespace}/CHECK_STATUS`
};

export const saveSettings = (settings: IAppSettings) => ({
  settings,
  type: types.SAVE_SETTINGS
});

export const fetchSettings = () => ({
  type: types.FETCH_SETTINGS
});

export const checkStatus = () => ({
  type: types.CHECK_STATUS
});
