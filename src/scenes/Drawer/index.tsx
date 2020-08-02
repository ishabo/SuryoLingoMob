import React from 'react';
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';
import { IInitialState } from '@sl/services/reducers';
import { isRegistered } from '@sl/services/selectors';
import analytics from '@react-native-firebase/analytics';
import glamor from 'glamorous-native';
import colors from '@sl/styles/colors';

interface IProps {
  items: { routeName: string; key: number | string }[];
  isLoggedIn: boolean;
}

class Drawer extends React.Component<IProps> {
  static navigationOptions = {
    header: null,
    headerRight: null,
    headerLeft: null,
  };

  componentDidMount() {
    analytics().setCurrentScreen(this.constructor.name);
  }

  private filteredItems = () => {
    const { items } = this.props;
    if (!this.props.isLoggedIn) {
      return items.filter((item) => item.routeName !== 'Profile');
    }
    return items.filter((item) => item.routeName !== 'Signon');
  };

  render() {
    const props = { ...this.props, items: this.filteredItems() };

    return (
      <GSContainer>
        <DrawerItems {...props} />
      </GSContainer>
    );
  }
}

export const GSContainer = glamor.view({
  backgroundColor: colors.snow,
  alignItems: 'stretch',
  flex: 1,
});

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  isLoggedIn: isRegistered(state),
});

export default connect(mapStateToProps)(Drawer);
