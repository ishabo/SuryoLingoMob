import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import Routes from '../routes';

export const AppNavigator = StackNavigator(Routes, { mode: 'card' });

const mapStateToProps = (state: any) => ({
  nav: state.nav,
});

class Navigation extends React.Component<any> {

  componentWillMount () {
    NavigationActions.reset(
      { index: 0, actions: [NavigationActions.navigate({ routeName: 'Splash' })] },
    );
  }

  render () {
    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });
    return <AppNavigator navigation={navigation} />;
  }
}

export default connect(mapStateToProps)(Navigation);
