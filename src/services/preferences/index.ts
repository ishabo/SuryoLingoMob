import * as actions from './actions';
import * as reducers from './reducers';

export interface IPrefererences {
  customKeyboardEnabled: boolean;
}

export interface IPreferencesAction {
  type: string;
  preferences?: IPrefererences;
}
export { actions, reducers };
