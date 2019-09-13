import * as React from 'react';
import { ScrollView, Alert, Animated, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { switchCourse } from 'services/courses/actions';
import I18n from 'I18n';
import { GSContainer, GSTitle, GSCourse, GSAnimatable } from './index.styles';
import { snakeToCamel, getWindowWidth } from 'helpers';
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';
import { DrawerItem, WhenReady } from 'components';
import { Analytics } from 'config/firebase';
const AnimatedCachedImage = Animated.createAnimatedComponent(CachedImage);
class Courses extends React.Component {
    constructor() {
        super(...arguments);
        this.switchCourse = (course) => {
            if (!course.comingSoon) {
                this.props.switchCourse(course.id);
            }
            else {
                Analytics.logEvent('coming_soon_course_clicked', { CourseName: course.name });
                Alert.alert(I18n.t('courses.alerts.commingSoon.title'), I18n.t('courses.alerts.commingSoon.description'), [
                    { text: I18n.t('courses.alerts.commingSoon.ok'), onPress: () => { } }
                ]);
            }
        };
        this.renderCourseCard = (course) => {
            const imageName = snakeToCamel(course.targetLanguage.shortName + '_' + course.sourceLanguage.shortName);
            const width = getWindowWidth() - 20;
            const height = width * (67 / 100);
            return (React.createElement(GSCourse, { key: course.id, onPress: () => {
                    this.switchCourse(course);
                } },
                React.createElement(AnimatedCachedImage, { style: { width, height }, source: {
                        uri: this.props.courseImages[imageName]
                    } })));
        };
        this.renderCourses = () => this.props.courses.map((course) => this.renderCourseCard(course));
    }
    componentDidMount() {
        Analytics.setCurrentScreen(this.constructor.name);
        this.cards.fadeInUp();
    }
    render() {
        return (React.createElement(GSContainer, null,
            React.createElement(SafeAreaView, { style: { flex: 1 } },
                React.createElement(GSTitle, null, I18n.t('courses.title')),
                React.createElement(ScrollView, { contentContainerStyle: {
                        flex: 1,
                        alignSelf: 'stretch',
                        alignContent: 'center'
                    } },
                    React.createElement(ImageCacheProvider, { urlsToPreload: Object.values(this.props.courseImages), onPreloadComplete: () => console.log(JSON.stringify(this.props.courseImages)) },
                        React.createElement(GSAnimatable, { innerRef: (c) => (this.cards = c) },
                            React.createElement(WhenReady, null, this.renderCourses())))))));
    }
}
Courses.navigationOptions = {
    title: I18n.t('courses.title'),
    header: null,
    drawerLabel: React.createElement(DrawerItem, { label: I18n.t('courses.title'), icon: "courses" })
};
const mapDispatchToProps = { switchCourse };
const mapStateToProps = (state) => ({
    courses: state.courses,
    courseImages: state.assets.courseImages,
    deviceId: state.profile.deviceId
});
export default connect(mapStateToProps, mapDispatchToProps)(Courses);
//# sourceMappingURL=index.js.map