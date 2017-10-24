import { combineReducers } from 'redux';

import ModuleReducers, { initialState as moduleInitialState } from '../services/modules/reducers';

interface IInitialState {
    modules: IModule[]
}
export const initialState: IInitialState = {
    modules: moduleInitialState
}

export default combineReducers({
    modules: ModuleReducers
});