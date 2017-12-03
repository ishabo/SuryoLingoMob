import { combineReducers } from 'redux';

import moduleReducers, {
    initialState as moduleInitialState, IModule
} from '../services/modules/reducers';
import courseReducers, {
    initialState as courseInitialState, ICourse
} from '../services/courses/reducers';
import progressReducers, {
    initialState as progressInitialState, IProgress
} from '../services/progress/reducers';

interface IInitialState {
    modules: IModule[];
    courses: ICourse[];
    progress: IProgress;
}

export const initialState: IInitialState = {
    courses: courseInitialState,
    modules: moduleInitialState,
    progress: progressInitialState
}

export default combineReducers({
    courses: courseReducers,
    modules: moduleReducers,
    progress: progressReducers
});