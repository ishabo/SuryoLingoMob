import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Button, Text } from 'native-base';
import { ICourse } from '../../services/courses/reducers';
import { connect } from 'react-redux';
import { switchCourse } from '../../services/profile/actions';
export interface IState { }

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  courseTitle: {
    fontSize: 12,
  },
});

class Courses extends React.Component<any, IState> {

  static navigationOptions = {
    title: 'Courses',
    headerLeft: null,
    headerRight: null,
  };

  private goToModules = () => {
    const { navigate } = this.props.navigation;
    navigate('Modules');
  }

  private renderCourseCard = (course: ICourse) =>
    <TouchableOpacity onPress={this.goToModules}>
      <Text style={styles.courseTitle}>
        {course.target_language.name}
      </Text>
      <Text >For {course.learner_language.name} Speakers</Text>
    </TouchableOpacity>


  private renderCourses = () =>
    this.props.courses.map((course: ICourse) => this.renderCourseCard(course))

  render () {
    return (
      <Container style={styles.container}>
        {this.renderCourses()}
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  switchCourse: (courseId: string) => dispatch(switchCourse(courseId)),
});

const mapStateToProps = (state: any) => ({
  courses: state.courses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
