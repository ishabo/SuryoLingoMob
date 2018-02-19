import * as reducers from './reducers';
import * as api from './api';
import * as actions from './actions';
import * as sagas from './sagas';
import * as selectors from './selectors';

export type TImageSizes = 'hdpi' | 'mdpi' | 'xhdpi' | 'xxhdpi' | 'xxxhdpi';

export interface ISkillIcon {
  locked: string;
  unlocked: string;
}

export interface ISkillIcons {
  [key: string]: {
    [key in TImageSizes]: ISkillIcon;
  };
}

export interface IAssets {
  skillIcons: ISkillIcons;
  courseImages: IDictionary<string>;
}

export interface IAssetsAction {
  skillIcons: IAssets['skillIcons'];
  courseImages: IAssets['courseImages'];
  type: string;
}

export {
  api,
  actions,
  reducers,
  selectors,
  sagas,
};
