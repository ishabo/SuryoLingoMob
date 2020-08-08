import * as reducers from './reducers'
import * as api from './api'
import * as actions from './actions'
import * as selectors from './selectors'
import * as sagas from './sagas'
import { IAction } from '@sl/services/sagas'

export type TTargetLangs = string | 'cl-syc' | 'tur-syr'
export type TLearnerLangs = string | 'cl-ara' | 'eng'

export interface ICourse {
  id: string
  name?: string
  enrolled?: boolean
  active?: boolean
  targetLanguage: ILanguage<TTargetLangs>
  sourceLanguage: ILanguage<TLearnerLangs>
  comingSoon?: boolean
  courseXp?: number
}

export interface ILanguage<T> {
  id: string
  shortName: T
  name: string
  fullName: string
}

export interface ICourseAction extends IAction {
  courseId?: string
  courses?: ICourse[]
}

export { api, actions, reducers, selectors, sagas }
