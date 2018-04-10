import React from 'react';
import { DrawerItems } from 'react-navigation';
import { View } from 'react-native';
import { SignOnOrOut } from 'components';
import { connect } from 'react-redux';
import { IInitialState } from 'services/reducers';
import { isRegistered } from 'services/selectors';
import { GSCustomText, ICustomText } from 'styles/text';
import glamor from 'glamorous-native';
import Color from 'styles/colors';

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
      <GSDrawerLabel><SignOnOrOut noStyle lang={'cl-ara'} /></GSDrawerLabel>
    </View>)
  }
}

export const GSDrawerLabel = glamor(GSCustomText)<ICustomText>({
  fontSize: 18,
  color: Color.orange,
  margin: 10,
  padding: 10,
});

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  isLoggedIn: isRegistered(state),
});

export default connect(mapStateToProps)(Drawer)