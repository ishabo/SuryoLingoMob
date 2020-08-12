import { IAction } from '@sl/services/sagas'
import * as reducers from './reducers'
import * as api from './api'
import * as actions from './actions'
import * as selectors from './selectors'

export type TImageSizes = 'hdpi' | 'mdpi' | 'xhdpi' | 'xxhdpi' | 'xxxhdpi'

export interface ISkillIcon {
  locked: string
  unlocked: string
}

export interface ISkillIcons {
  [key: string]: { [key in TImageSizes]: ISkillIcon }
}

export interface IAssets {
  skillIcons: ISkillIcons
  courseImages: IDictionary<string>
}

export interface IAssetsAction extends IAction {
  skillIcons: IAssets['skillIcons']
  courseImages: IAssets['courseImages']
}

export { api, actions, reducers, selectors }
