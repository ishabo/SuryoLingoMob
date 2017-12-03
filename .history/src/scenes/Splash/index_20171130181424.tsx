import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import { saveModules } from '../../services/modules/actions';
import { fetchCourses } from '../../services/courses/actions';
import Images from '../../assets/images';
import { IModule } from '../../services/modules/reducers';

export interface IStateToProps {
  userHasCuorse: boolean;
}

export interface IDispatchToProps {
  fetchCourses: () => void;
}

export interface IProps extends IStateToProps, IDispatchToProps { }
export interface IState { }

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
  },
});

class Splash extends React.Component<IProps, IState> {

  static navigationOptions = {
    header: null,
  };

  componentWillMount () {
    this.props.fetchCourses();
    // this.props.saveModules(modules);
  }

  componentDidMount () {
    const { navigate } = this.props.navigation;
    setTimeout(() => { navigate('Courses'); }, 1000);
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
  // saveModules: (modules: IModule[]) => dispatch(saveModules(modules)),
});

const matchStateToProps = (state: any) => ({
  userHasCuorse: state.profile.currentCourse !== null,
});

export default connect(matchStateToProps, mapDispatchToProps)(Splash);
