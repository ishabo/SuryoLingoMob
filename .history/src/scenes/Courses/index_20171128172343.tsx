import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Text } from 'native-base';

import I18n from '../../i18n';
import { BackHandler } from 'react-native';

export interface State { }
const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
});
export default class Courses extends React.Component<any, State> {

  static navigationOptions = {
    title: I18n.t('Courses'),
    headerLeft: null,
    headerRight: null,
  };

  private goToModules = () => {
    const { navigate } = this.props.navigation;
    navigate('Modules');
  }

  render () {
    return (
      <Container style={styles.container}>
        <Button>
          <Text onPress={this.goToModules}>
            Start
          </Text>
        </Button>
      </Container>
    );
  }
}
