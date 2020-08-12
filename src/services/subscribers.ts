import * as progress from '@sl/services/progress'
import { IInitialState } from '@sl/services/reducers'
import { Store } from 'redux'

export default (store: Store<IInitialState>) => () => {
  if (store.getState().progress.lessonsToSync.length > 0) {
    store.dispatch(progress.actions.syncFinishedLessons())
  }
}
