import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text } from 'native-base';
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

  private renderCourseCard = (course: ICourse) =>
    <TouchableOpacity key={course.id} onPress={() => this.props.switchCourse(course.id)}>
      <Text style={styles.courseTitle}>
        {course.targetLanguage.name}
      </Text>
      <Text >For {course.learnersLanguage.name} Speakers</Text>
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
