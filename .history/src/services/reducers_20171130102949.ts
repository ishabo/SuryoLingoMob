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
import profileReducer, {
  initialState as profileInitialState, IProfile
} from '../services/profile/reducers';

interface IInitialState {
  modules: IModule[];
  courses: ICourse[];
  progress: IProgress;
  profile: IProfile;
}

export const initialState: IInitialState = {
  courses: courseInitialState,
  modules: moduleInitialState,
  progress: progressInitialState,
  profile: profileInitialState,
};

export default combineReducers({
  courses: courseReducers,
  modules: moduleReducers,
  progress: progressReducers,
  profile: profileReducer,
});
