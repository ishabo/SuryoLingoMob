import { types } from '../actions';
import { IAssets, IAssetsAction } from '../';

export const initialState: IAssets = { skillIcons: {}, courseImages: {} };

export const reducer = (state: IAssets = initialState, action: IAssetsAction) => {
  switch (action.type) {
    case types.SET_SKILL_ICONS:
      return { ...state, skillIcons: action.skillIcons };
    case types.SET_COURSE_IMAGES:
      return { ...state, courseImages: action.courseImages };

    default:
      return state;
  }
};

