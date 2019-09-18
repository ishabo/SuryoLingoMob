import * as React from 'react';
import { ScrollView, Alert, Animated, SafeAreaView } from 'react-native';
import { ICourse } from '@sl/services/courses';
import { connect } from 'react-redux';
import { switchCourse } from '@sl/services/courses/actions';
import I18n from '@sl/i18n';
import { GSContainer, GSTitle, GSCourse, GSAnimatable } from './index.styles';
import { snakeToCamel, getWindowWidth } from '@sl/helpers';
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';
import { IAssets } from '@sl/services/assets';
import { IInitialState } from '@sl/services/reducers';
import { AnimatableAnimationMethods } from 'react-native-animatable';
import { DrawerItem, WhenReady } from '@sl/components';
import { Analytics } from '@sl/config/firebase';

const AnimatedCachedImage = Animated.createAnimatedComponent(CachedImage);

interface IProps {
  courseImages: IAssets['courseImages'];
  courses: ICourse[];
  switchCourse(courseId: string): void;
  deviceId: string;
}

class Courses extends React.Component<IProps> {
  private cards: AnimatableAnimationMethods;

  static navigationOptions = {
    title: I18n.t('courses.title'),
    header: null,
    drawerLabel: <DrawerItem label={I18n.t('courses.title')} icon="courses" />
  };

  componentDidMount() {
    Analytics.setCurrentScreen(this.constructor.name);
    this.cards.fadeInUp();
  }

  private switchCourse = (course: ICourse) => {
    if (!course.comingSoon) {
      this.props.switchCourse(course.id);
    } else {
      Analytics.logEvent('coming_soon_course_clicked', { CourseName: course.name });

      Alert.alert(I18n.t('courses.alerts.commingSoon.title'), I18n.t('courses.alerts.commingSoon.description'), [
        { text: I18n.t('courses.alerts.commingSoon.ok'), onPress: () => {} }
      ]);
    }
  };

  private renderCourseCard = (course: ICourse) => {
    const imageName = snakeToCamel(course.targetLanguage.shortName + '_' + course.sourceLanguage.shortName);

    const width = getWindowWidth() - 20;
    const height = width * (67 / 100);

    return (
      <GSCourse
        key={course.id}
        onPress={() => {
          this.switchCourse(course);
        }}
      >
        <AnimatedCachedImage
          style={{ width, height }}
          source={{
            uri: this.props.courseImages[imageName]
          }}
        />
      </GSCourse>
    );
  };

  private renderCourses = () => this.props.courses.map((course: ICourse) => this.renderCourseCard(course));

  render() {
    return (
      <GSContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <GSTitle>{I18n.t('courses.title')}</GSTitle>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              alignSelf: 'stretch',
              alignContent: 'center'
            }}
          >
            <ImageCacheProvider
              urlsToPreload={Object.values(this.props.courseImages)}
              onPreloadComplete={() => console.log(JSON.stringify(this.props.courseImages))}
            >
              <GSAnimatable innerRef={(c: AnimatableAnimationMethods) => (this.cards = c)}>
                <WhenReady>{this.renderCourses()}</WhenReady>
              </GSAnimatable>
            </ImageCacheProvider>
          </ScrollView>
        </SafeAreaView>
      </GSContainer>
    );
  }
}

const mapDispatchToProps = { switchCourse };

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  courses: state.courses,
  courseImages: state.assets.courseImages,
  deviceId: state.profile.deviceId
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);
