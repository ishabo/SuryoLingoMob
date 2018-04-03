import * as React from 'react';
import { ScrollView, Alert, Animated } from 'react-native';
import { ICourse } from 'services/courses';
import { connect } from 'react-redux';
import { switchCourse } from 'services/courses/actions';
import I18n from 'I18n';
import { GSContainer, GSTitle, GSCourse, GSAnimatable } from './index.styles';
import { snakeToCamel, getWindowWidth } from 'helpers';
import {
  CachedImage,
  ImageCacheProvider,
} from 'react-native-cached-image';
import { IAssets } from 'services/assets';
import { IInitialState } from 'services/reducers';
import { Dispatch } from 'redux';

const AnimatedCachedImage = Animated.createAnimatedComponent(CachedImage);

interface IProps {
  courseImages: IAssets['courseImages'];
  courses: ICourse[];
  switchCourse (courseId: string): void;
}

class Courses extends React.Component<IProps> {

  private cards: any;

  static navigationOptions = {
    title: I18n.t('courses.title'),
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
    const imageName = snakeToCamel(course.targetLanguage.shortName + '_' +
      course.learnersLanguage.shortName);

    const width = getWindowWidth() - 20;
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
        <GSTitle>
          {I18n.t('courses.title')}
        </GSTitle>
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

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  switchCourse: (courseId: string) => dispatch(switchCourse(courseId)),
});

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  courses: state.courses,
  courseImages: state.assets.courseImages,
});

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
