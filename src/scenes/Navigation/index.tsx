import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { AppNavigator } from 'services/nav';

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
