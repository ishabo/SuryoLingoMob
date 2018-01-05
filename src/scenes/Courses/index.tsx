import React from 'react';
import { ScrollView } from 'react-native';
import { ICourse } from 'services/courses';
import { connect } from 'react-redux';
import { switchCourse } from 'services/courses/actions';

import {
  GSContainer,
  GSCourse,
  GSCourseSubTitle,
  GSCourseTitle,
  GSAnimatable,
} from './index.styles';

import I18n from 'I18n';

export interface IState { }

class Courses extends React.Component<any, IState> {

  private cards: any;

  static navigationOptions = {
    title: I18n.t('courses.title'),
    headerLeft: null,
    headerRight: null,
  };

  componentDidMount () {
    this.cards.fadeInUp();
  }

  private targetLanguage = (course: ICourse) =>
    I18n.t(`courses.languages.long.${course.targetLanguage.shortName}`)


  private learningLanguage = (course: ICourse) =>
    I18n.t(`courses.languages.long.${course.learnersLanguage.shortName}`)

  private renderCourseCard = (course: ICourse) => {
    const targetLang = course.targetLanguage.shortName as TLangs;
    const learnersLang = course.learnersLanguage.shortName as TLangs;
    return <GSCourse
      key={course.id} onPress={() => this.props.switchCourse(course.id)}>
      <GSCourseTitle lang={targetLang}>
        {course.targetLanguage.name}
      </GSCourseTitle>
      <GSCourseSubTitle lang={learnersLang}>
        {I18n.t('courses.learnLanguage', {
          lang: this.targetLanguage(course),
        })}
      </GSCourseSubTitle>
      <GSCourseSubTitle lang={learnersLang}>
        {I18n.t('courses.forSpeakersOfLanguage', {
          lang: this.learningLanguage(course),
        })}
      </GSCourseSubTitle>
    </GSCourse>;
  }

  private renderCourses = () =>
    this.props.courses.map((course: ICourse) =>
      this.renderCourseCard(course))

  render () {
    return (
      <GSContainer>
        <ScrollView>
          <GSAnimatable innerRef={(c: Courses) => this.cards = c} >
            {this.renderCourses()}
          </GSAnimatable>
        </ScrollView>
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
