import React from 'react';
import { DrawerItems } from 'react-navigation';
import { View } from 'react-native';
import { SignOnOrOut } from 'components';
import { connect } from 'react-redux';
import { IInitialState } from 'services/reducers';
import { isRegistered } from 'services/selectors';

interface IProps {
  items: any;
  isLoggedIn: boolean;
}

class Drawer extends React.Component<IProps> {

  private filteredItems = () => {
    const { items } = this.props;
    if (!this.props.isLoggedIn) {
      return items.filter(item => item.routeName !== 'Profile')
    }
    return items;
  }
  render () {
    const props = { ...this.props, items: this.filteredItems() };

    return (<View>
      <DrawerItems {...props} />
      <SignOnOrOut simple />
    </View>)
  }
}

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  isLoggedIn: isRegistered(state),
});

export default connect(mapStateToProps)(Drawer)