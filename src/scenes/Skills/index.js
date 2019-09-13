import * as React from 'react';
import { ScrollView, BackHandler, Keyboard, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Skill } from './components';
import { mapValues, groupBy } from 'lodash';
import { fetchSkills } from 'services/skills/actions';
import { getActiveCourse, getPublishedSkills, getComingSoonSkills } from 'services/selectors';
import { exitApp, displayInterstitialAd } from 'helpers';
import { Hamburger, DrawerItem, WhenReady } from 'components';
import { GSContainer, GUnit, GComingSoonSeparator } from './index.styles';
import I18n from 'I18n';
import shortid from 'shortid';
import { Analytics } from 'config/firebase';
class Skills extends React.Component {
    constructor() {
        super(...arguments);
        this.handleBackPress = () => {
            exitApp();
            return false;
        };
        this.goToCourses = () => {
            const { navigate } = this.props.navigation;
            navigate('Courses');
        };
        this.goToLessons = (skill) => {
            const { navigate } = this.props.navigation;
            navigate('Lessons', { skill });
        };
        this.enterSkill = (skill) => {
            this.isSkillActive(skill) ? this.goToLessons(skill) : alert(I18n.t('skills.skillInactive'));
        };
        this.isSkillActive = (skill) => skill.active || this.props.profile.isTester;
    }
    componentDidMount() {
        Analytics.setCurrentScreen(this.constructor.name);
        if (!this.props.activeCourse) {
            this.goToCourses();
        }
        Keyboard.dismiss();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        setTimeout(() => {
            displayInterstitialAd('skills');
        }, 1000);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    renderUnits(published) {
        const filteredSkills = published ? this.props.publishedSkills : this.props.comingSoonSkills;
        if (filteredSkills.length === 0) {
            return null;
        }
        const skills = mapValues(groupBy(filteredSkills, 'unit'));
        const units = Object.keys(skills);
        const mappedUnits = [];
        units.forEach((unit) => {
            mappedUnits.push(React.createElement(GUnit, { key: shortid.generate() }, this.renderSkills(skills[unit], published)));
        });
        return (React.createElement(React.Fragment, null,
            published || React.createElement(GComingSoonSeparator, null, I18n.t(`skills.comingSoon`)),
            mappedUnits));
    }
    renderSkills(skills, published) {
        return skills.map((skill) => (React.createElement(Skill, { key: `skill_${skill.id}`, name: skill.name, icon: skill.icon, inactive: skill.isComingSoon, progress: skill.progress && published ? skill.progress : 0, unlocked: published && this.isSkillActive(skill), onSkillsClick: () => (published ? this.enterSkill(skill) : alert(I18n.t('skills.skillInactive'))) })));
    }
    render() {
        return (React.createElement(GSContainer, null,
            React.createElement(WhenReady, null,
                React.createElement(ScrollView, { style: { flexDirection: 'column' }, refreshControl: React.createElement(RefreshControl, { refreshing: this.props.loading, onRefresh: this.props.fetchSkills }) },
                    this.renderUnits(true),
                    this.renderUnits(false)))));
    }
}
Skills.navigationOptions = ({ navigation: { navigate } }) => ({
    title: I18n.t(`skills.title`),
    headerLeft: React.createElement(Hamburger, { onPress: () => navigate('DrawerOpen') }),
    headerRight: null,
    drawerLabel: React.createElement(DrawerItem, { label: I18n.t('skills.title'), icon: "skills" })
});
const mapStateToProps = (state) => ({
    profile: state.profile,
    skills: state.skills,
    loading: state.api.loading,
    activeCourse: getActiveCourse(state),
    publishedSkills: getPublishedSkills(state),
    comingSoonSkills: getComingSoonSkills(state)
});
const mapDispatchToProps = {
    fetchSkills
};
export default connect(mapStateToProps, mapDispatchToProps)(Skills);
//# sourceMappingURL=index.js.map