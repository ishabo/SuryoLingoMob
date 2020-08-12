import * as React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, NavigationState } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { AppNavigator } from '@sl/routes'
import { BackHandler } from 'react-native'
import { IInitialState } from '@sl/services/reducers'
import { Dispatch } from 'redux'

interface IProps {
  dispatch: Dispatch<any>
  nav: NavigationState
}

class Navigation extends React.Component<IProps> {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => true

  render() {
    const addListener = createReduxBoundAddListener('root')
    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
      addListener,
    })
    return <AppNavigator navigation={navigation} />
  }
}

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  nav: state.nav,
})

export default connect(mapStateToProps)(Navigation)
