import React from 'react';
import { ScrollView, Alert, Animated } from 'react-native';
import { ICourse } from 'services/courses';
import { connect } from 'react-redux';
import { switchCourse } from 'services/courses/actions';
import I18n from 'I18n';
import {
  GSContainer,
  GSCourse,
  GSAnimatable,
} from './index.styles';
import { Icon } from 'native-base';
import { snakeToCamel, getWindowWidth } from 'helpers';
import {
  CachedImage,
  ImageCacheProvider,
} from 'react-native-cached-image';

const AnimatedCachedImage = Animated.createAnimatedComponent(CachedImage);


export interface IState { }

class Courses extends React.Component<any, IState> {

  private cards: any;

  static navigationOptions = {
    tabBarLabel: I18n.t('courses.title'),
    title: I18n.t('courses.title'),
    tabBarHidden: true,
    headerLeft: null,
    headerRight: null,
    tabBarVisible: false,
    tabBarIcon: <Icon name="switch" />,
  };

  componentDidMount () {
    this.cards.fadeInUp();
  }

  private switchCourse = (course: ICourse) => {
    if (!course.comingSoon) {
      this.props.switchCourse(course.id);
    } else {
      Alert.alert(
        I18n.t('courses.alerts.commingSoon.title'),
        I18n.t('courses.alerts.commingSoon.description'),
        [
          { text: I18n.t('courses.alerts.commingSoon.ok'), onPress: () => { } },
        ],
      );
    }
  }
  private renderCourseCard = (course: ICourse) => {
    // const targetLang = course.targetLanguage.shortName as TLangs;
    const imageName = snakeToCamel(course.targetLanguage.shortName + '_' +
      course.learnersLanguage.shortName);

    const width = getWindowWidth() - 10;
    const height = (width * (67 / 100));

    return <GSCourse
      key={course.id} onPress={() => this.switchCourse(course)}>
      <AnimatedCachedImage
        style={{ width, height }}
        source={{
          uri: this.props.courseImages[imageName],
        }}
      />
    </GSCourse >;
  }

  private renderCourses = () =>
    this.props.courses.map((course: ICourse) =>
      this.renderCourseCard(course))

  render () {
    return (
      <GSContainer>
        <ScrollView
          contentContainerStyle={{
            flex: 1, alignSelf: 'stretch', alignContent: 'center',
          }} >
          <ImageCacheProvider
            urlsToPreload={Object.values(this.props.courseImages)}
            onPreloadComplete={() => console.log(JSON.stringify(this.props.courseImages))}
          >
            <GSAnimatable innerRef={(c: Courses) => this.cards = c} >
              {this.renderCourses()}
            </GSAnimatable>
          </ImageCacheProvider>
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
  courseImages: state.assets.courseImages,
});

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
