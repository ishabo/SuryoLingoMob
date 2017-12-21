import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import { fetchCourses } from '../../services/courses/actions';
import { getActiveCourse } from '../../services/selectors';

import images from '../../assets/images';
export interface IStateToProps {
  activeCourse: string;
}

export interface IDispatchToProps {
  fetchCourses: () => void;
}

export interface IProps extends IStateToProps, IDispatchToProps {
  navigation: NavigationScreenProp<any, any>;
}

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

  componentDidMount () {
    const { activeCourse } = this.props;
    if (!activeCourse) {
      this.props.fetchCourses();
    }
  }

  render () {
    return (
      <Container style={styles.container}>
        <Text style={styles.welcome}>
          <Image style={{ height: 230, width: 230 }} source={images.logo.splash} />
        </Text>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchCourses: () => dispatch(fetchCourses()),
});

const matchStateToProps = (state: any) => ({
  activeCourse: getActiveCourse(state),
});

export default connect(matchStateToProps, mapDispatchToProps)(Splash);
