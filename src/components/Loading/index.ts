import connect, { ILoadingProps } from './connect'
import glamor from 'glamorous-native'
import Loading from './Loading'

export interface IProps extends ILoadingProps {
  noModal?: boolean
}

export const GSLoading = glamor.view({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch',
})

export default connect(Loading)
