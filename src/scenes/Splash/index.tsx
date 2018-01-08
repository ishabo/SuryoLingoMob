import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import { fetchCourses } from 'services/courses/actions';
import { fetchSkills } from 'services/skills/actions';
import { setLoadingOff } from 'services/api/actions';
import { getActiveCourse } from 'services/selectors';
import { syncFinishedLessons } from 'services/progress/actions';

import images from 'assets/images';
export interface IStateToProps {
  activeCourse: string;
}

export interface IDispatchToProps {
  fetchCourses: () => void;
  setLoadingOff: () => void;
  syncFinishedLessons: () => void;
  fetchSkills: () => void;
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

  componentDidMount () {
    this.props.setLoadingOff();
    const { activeCourse } = this.props;
    // Consider moving all this balaga to sagas
    this.props.syncFinishedLessons();
    if (!activeCourse) {
      setTimeout(() => {
        this.props.fetchCourses();
      }, 2000);
    } else {
      this.props.fetchSkills();
    }
  }

  render () {
    return (
      <Container style={styles.container}>
        <Text style={styles.welcome}>
          <Image style={{ width: 300, height: 295 }} source={images.logo.splash} />
        </Text>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchCourses: () => dispatch(fetchCourses()),
  fetchSkills: () => dispatch(fetchSkills()),
  setLoadingOff: () => dispatch(setLoadingOff()),
  syncFinishedLessons: () => dispatch(syncFinishedLessons()),
});

const matchStateToProps = (state: any) => ({
  activeCourse: getActiveCourse(state),
});

export default connect(matchStateToProps, mapDispatchToProps)(Splash);
