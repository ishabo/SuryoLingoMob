import React from 'react';
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';
import { isRegistered } from 'services/selectors';
import { Analytics } from 'config/firebase';
import glamor from 'glamorous-native';
import colors from 'styles/colors';
class Drawer extends React.Component {
    constructor() {
        super(...arguments);
        this.filteredItems = () => {
            const { items } = this.props;
            if (!this.props.isLoggedIn) {
                return items.filter(item => item.routeName !== 'Profile');
            }
            else {
                return items.filter(item => item.routeName !== 'Signon');
            }
        };
    }
    componentDidMount() {
        Analytics.setCurrentScreen(this.constructor.name);
    }
    render() {
        const props = Object.assign({}, this.props, { items: this.filteredItems() });
        return (React.createElement(GSContainer, null,
            React.createElement(DrawerItems, Object.assign({}, props))));
    }
}
Drawer.navigationOptions = {
    header: null,
    headerRight: null,
    headerLeft: null
};
export const GSContainer = glamor.view({
    backgroundColor: colors.snow,
    alignItems: 'stretch',
    flex: 1
});
const mapStateToProps = (state) => ({
    isLoggedIn: isRegistered(state)
});
export default connect(mapStateToProps)(Drawer);
//# sourceMappingURL=index.js.map