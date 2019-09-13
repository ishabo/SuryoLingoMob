import * as React from 'react';
import { connect } from 'react-redux';
import Lesson from './components/Lesson';
import { BackHandler, Keyboard } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { enterLesson } from 'services/progress/actions';
import { getSkillLessons, getSourceLanguage, getTargetLanguage } from 'services/selectors';
import { SkillIcon } from '../Skills/components';
import { GSCustomText } from 'styles/text';
import { overviewLesson } from 'services/progress/actions';
import { GSContainer, GSAnimatable, GSLessonIcon, GSLessonInstruction } from './index.styles';
import { Analytics } from 'config/firebase';
import I18n from 'I18n';
class Lessons extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            snapped: false
        };
        this.getNumOfActiveLessons = () => this.getFinishedLesson().length;
        this.getFinishedLesson = () => this.props.getLessons(this.getSkill().id).filter((lesson) => lesson.finished);
        this.getSkill = () => this.props.navigation.state.params.skill;
        this.totalLessons = () => this.getSkill().lessons.length;
        this.handleBackPress = () => {
            this.props.navigation.goBack();
            return true;
        };
        this.snapToItem = () => {
            if (this.carousal) {
                this.setState({ snapped: true }, () => {
                    const itemIndex = this.getNumOfActiveLessons() === this.totalLessons() ? this.totalLessons() - 1 : this.getNumOfActiveLessons();
                    this.carousal.snapToItem(itemIndex);
                });
            }
        };
        this.isLessonActive = (lesson) => {
            if (this.props.profile.isTester) {
                return true;
            }
            if (lesson.finished || lesson.order === 1) {
                return true;
            }
            else {
                const previousOrder = this.getFinishedLesson().find((l) => l.order === lesson.order - 1);
                return previousOrder && previousOrder.finished;
            }
        };
    }
    componentDidMount() {
        Analytics.setCurrentScreen(this.constructor.name);
        Keyboard.dismiss();
        if (this.state.snapped === false) {
            this.cards.fadeInUp();
            setTimeout(this.snapToItem, 1200);
        }
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    renderCards({ item: lesson }) {
        return (React.createElement(Lesson, { skill: this.props.navigation.state.params.skill, lesson: lesson, active: this.isLessonActive(lesson), enterLesson: this.props.enterLesson, previewLesson: this.props.previewLesson, targetLanguage: this.props.targetLanguage, sourceLanguage: this.props.sourceLanguage, loading: this.props.loading }));
    }
    render() {
        const skill = this.props.navigation.state.params.skill;
        return (React.createElement(GSContainer, null,
            React.createElement(GSLessonIcon, null,
                React.createElement(SkillIcon, { icon: this.props.navigation.state.params.skill.icon, state: "unlocked", size: "xxxhdpi" })),
            React.createElement(GSLessonInstruction, null,
                React.createElement(GSCustomText, { lang: this.props.sourceLanguage }, I18n.t('lessons.instruction'))),
            React.createElement(GSAnimatable, { innerRef: (c) => (this.cards = c) },
                React.createElement(Carousel, { ref: (c) => (this.carousal = c), data: this.props.getLessons(skill.id), renderItem: this.renderCards.bind(this), sliderWidth: 380, itemWidth: 300, style: { marginTop: 200 }, lockScrollWhileSnapping: true }))));
    }
}
Lessons.navigationOptions = ({ navigation }) => ({
    title: I18n.t('lessons.title', { skill: navigation.state.params.skill.name }),
    headerBackTitle: ''
});
const mapStateToProps = (state) => ({
    sourceLanguage: getSourceLanguage(state),
    targetLanguage: getTargetLanguage(state),
    getLessons: (skillId) => getSkillLessons(skillId)(state),
    profile: state.profile,
    loading: state.api.loading
});
const mapDispatchToProps = (dispatch) => ({
    enterLesson: (lessonId) => dispatch(enterLesson(lessonId)),
    previewLesson: (lessonId) => dispatch(overviewLesson(lessonId))
});
export default connect(mapStateToProps, mapDispatchToProps)(Lessons);
//# sourceMappingURL=index.js.map