import { connect } from 'react-redux'
import { IInitialState } from '@sl/services/reducers'

export interface ILoadingProps {
  loading: boolean
}

const mapStateToDispatch = (state: IInitialState): ILoadingProps => ({
  loading: state.api.loading,
})

export default connect(mapStateToDispatch)
