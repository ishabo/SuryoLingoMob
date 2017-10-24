import { types } from '../actions';

export interface IModuleAction {
    type: string;
    modules?: IModule[]
}

export const initialState: IModule[] = []

export default function (state: IModule[] = initialState, action: IModuleAction) {
    switch (action.type) {
        case types.SAVE_MODULES:
            return action.modules
        default:
            return state
    }
}