import * as React from 'react';
import { ScrollView, BackHandler, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Skill } from './components';
import { mapValues, groupBy } from 'lodash';
import { ISkill } from 'services/skills';
import { getActiveCourse, getPublishedSkills, getComingSoonSkills } from 'services/selectors';
import { IInitialState } from 'services/reducers';
import { NavigationScreenProp } from 'react-navigation';
import { exitApp, displayInterstitialAd } from 'helpers';
import { Hamburger } from 'components';
import { ICourse } from 'services/courses';
import { IProfile } from 'services/profile';
import { GSDrawerLabel } from 'scenes/Drawer';
import { GSContainer, GUnit, GComingSoonSeparator } from './index.styles';
import I18n from 'I18n';
import shortid from 'shortid';

interface IProps {
  activeCourse: ICourse;
  navigation: NavigationScreenProp<any>;
  skills: ISkill[];
  profile: IProfile;
  publishedSkills: ISkill[];
  comingSoonSkills: ISkill[];
}

class Skills extends React.Component<IProps> {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: I18n.t(`skills.title`),
    headerLeft: <Hamburger onPress={() => navigate('DrawerOpen')} />,
    drawerLabel: <GSDrawerLabel>{I18n.t('skills.title')}</GSDrawerLabel>,
    headerRight: null
  });

  componentWillMount() {
    if (!this.props.activeCourse) {
      this.goToCourses();
    }
  }

  componentDidMount() {
    Keyboard.dismiss();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    displayInterstitialAd('skills');
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    exitApp();
    return false;
  };

  goToCourses = () => {
    const { navigate } = this.props.navigation;
    navigate('Courses');
  };

  private goToLessons = (skill: ISkill) => {
    const { navigate } = this.props.navigation;
    navigate('Lessons', { skill });
  };

  private renderUnits(published: boolean) {
    const filteredSkills = published ? this.props.publishedSkills : this.props.comingSoonSkills;
    if (filteredSkills.length === 0) {
      return null;
    }
    const skills = mapValues(groupBy(filteredSkills, 'unit'));
    const units = Object.keys(skills);

    const mappedUnits: any[] = [];

    units.forEach((unit: string | number) => {
      mappedUnits.push(<GUnit key={shortid.generate()}>{this.renderSkills(skills[unit], published)}</GUnit>);
    });

    return (
      <>
        {published || <GComingSoonSeparator>{I18n.t(`skills.comingSoon`)}</GComingSoonSeparator>}
        {mappedUnits}
      </>
    );
  }

  private enterSkill = (skill: ISkill) => {
    this.isSkillActive(skill) ? this.goToLessons(skill) : alert(I18n.t('skills.skillInactive'));
  };

  private isSkillActive = (skill: ISkill): boolean => skill.active || this.props.profile.isTester;

  private renderSkills(skills: ISkill[], published: boolean) {
    return skills.map((skill: ISkill) => (
      <Skill
        key={`skill_${skill.id}`}
        name={skill.name}
        icon={skill.icon}
        inactive={skill.isComingSoon}
        progress={skill.progress && published ? skill.progress : 0}
        unlocked={published && this.isSkillActive(skill)}
        onSkillsClick={() => (published ? this.enterSkill(skill) : alert(I18n.t('skills.skillInactive')))}
      />
    ));
  }

  render() {
    return (
      <GSContainer>
        <ScrollView style={{ flexDirection: 'column' }}>
          {this.renderUnits(true)}
          {this.renderUnits(false)}
        </ScrollView>
      </GSContainer>
    );
  }
}

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  profile: state.profile,
  skills: state.skills,
  activeCourse: getActiveCourse(state),
  publishedSkills: getPublishedSkills(state),
  comingSoonSkills: getComingSoonSkills(state)
});

export default connect(mapStateToProps)(Skills);
