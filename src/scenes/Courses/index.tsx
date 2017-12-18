import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import { ICourse } from '../../services/courses/reducers';
import { connect } from 'react-redux';
import { switchCourse } from '../../services/progress/actions';
import glamor from 'glamorous-native';
import I18n from '../../i18n';
import Colors from '../../styles/colors';

export interface IState { }

const GSContainer = glamor(Container)({
  padding: 20,
  display: 'flex',
});

const GSCourseTitle = glamor.text({
  fontSize: 30,
  alignSelf: 'center',
  textAlign: 'center',
});
const GSCourseSubTitle = glamor.text({
  fontSize: 20,
  alignSelf: 'center',
  textAlign: 'center',
});

const GSCourseButton = glamor(TouchableOpacity)({
  borderWidth: 0.3,
  borderRadius: 10,
  padding: 20,
  shadowOffset: { width: 4, height: 4 },
  shadowColor: 'black',
  shadowOpacity: 0.2,
  backgroundColor: Colors.lightBlue,
});

class Courses extends React.Component<any, IState> {

  static navigationOptions = {
    title: 'Courses',
    headerLeft: null,
    headerRight: null,
  };

  private targetLanguage = (course: ICourse) =>
    I18n.t(`courses.languages.long.${course.targetLanguage.shortName}`)


  private learningLanguage = (course: ICourse) =>
    I18n.t(`courses.languages.long.${course.learnersLanguage.shortName}`)

  private renderCourseCard = (course: ICourse) =>
    <GSCourseButton key={course.id} onPress={() => this.props.switchCourse(course.id)}>
      <GSCourseTitle>
        {course.targetLanguage.name}
      </GSCourseTitle>
      <GSCourseSubTitle>
        {I18n.t('courses.learnLanguage', {
          lang: this.targetLanguage(course),
        })}
      </GSCourseSubTitle>
      <GSCourseSubTitle>
        {I18n.t('courses.forSpeakersOfLanguage', {
          lang: this.learningLanguage(course),
        })}
      </GSCourseSubTitle>
    </GSCourseButton>

  private renderCourses = () =>
    this.props.courses.map((course: ICourse) => this.renderCourseCard(course))

  render () {
    return (
      <GSContainer>
        {this.renderCourses()}
      </GSContainer>
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
