import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Text } from 'native-base';
import modules from '../../data/dummy/modules';
import { connect } from 'react-redux';
import { saveModules } from '../../services/modules/actions';
import { fetchCourses } from '../../services/courses/actions';

import Images from '../../assets/images';
import { IModule } from '../../services/modules/reducers';

export interface Props { }
export interface State { }

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

class Splash extends React.Component<any, State> {

  static navigationOptions = {
    header: null,
  };

  componentWillMount () {
    this.props.fetchCourses();
    this.props.saveModules(modules);
  }

  componentDidMount () {
    const { navigate } = this.props.navigation;
    setTimeout(() => { navigate('Modules'); }, 1000);
  }

  render () {
    return (
      <Container style={styles.container}>
        <Text style={styles.welcome}>
          <Image style={{ height: 230, width: 230 }} source={Images.logo.splash} />
        </Text>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchCourses: () => dispatch(fetchCourses()),
  saveModules: (modules: IModule[]) => dispatch(saveModules(modules)),
});

export default connect(null, mapDispatchToProps)(Splash);
