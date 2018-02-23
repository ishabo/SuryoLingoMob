import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import {
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import { AppNavigator } from 'routes';
import { BackHandler } from 'react-native';


const mapStateToProps = (state: any) => ({
  nav: state.nav,
});

class Navigation extends React.Component<any> {

  componentWillMount () {
    NavigationActions.reset(
      { index: 0, actions: [NavigationActions.navigate({ routeName: 'Splash' })] },
    );
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    return true;
  }

  render () {
    const addListener = createReduxBoundAddListener("root");

    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
      addListener,
    } as any); // TODO: remove any when type is available
    return <AppNavigator navigation={navigation} />;
  }
}

export default connect(mapStateToProps)(Navigation);
