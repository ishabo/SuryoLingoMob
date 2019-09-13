import * as React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { AppNavigator } from 'routes';
import { BackHandler } from 'react-native';
class Navigation extends React.Component {
    constructor() {
        super(...arguments);
        this.handleBackPress = () => {
            return true;
        };
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    render() {
        const addListener = createReduxBoundAddListener('root');
        const navigation = addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
            addListener
        });
        return React.createElement(AppNavigator, { navigation: navigation });
    }
}
const mapStateToProps = (state) => ({
    nav: state.nav
});
export default connect(mapStateToProps)(Navigation);
//# sourceMappingURL=index.js.map