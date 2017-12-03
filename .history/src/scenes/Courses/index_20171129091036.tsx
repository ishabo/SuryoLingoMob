import * as React from 'react';
// import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import { ICourse } from '../../services/courses/reducers';
import { connect } from 'react-redux';
import { switchCourse } from '../../services/profile/actions';
export interface State { }

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//   },
// });

class Courses extends React.Component<any, State> {

  static navigationOptions = {
    title: 'Courses',
    headerLeft: null,
    headerRight: null,
  };

  private goToModules = () => {
    const { navigate } = this.props.navigation;
    navigate('Modules');
  }

  private renderCourses = () => {
    this.props.courses.map((course: ICourse) =>
      <Button>
        <Text onPress={this.goToModules}>
          {course.name}
        </Text>
      </Button>,
    );
  }

  render () {
    return (
      this.renderCourses()
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
