import * as React from 'react';
import { ScrollView, BackHandler, Keyboard, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Skill } from './components';
import { mapValues, groupBy } from 'lodash';
import { ISkill } from '@sl/services/skills';
import { fetchSkills } from '@sl/services/skills/actions';
import { getActiveCourse, getPublishedSkills, getComingSoonSkills } from '@sl/services/selectors';
import { IInitialState } from '@sl/services/reducers';
import { NavigationScreenProp } from 'react-navigation';
import { exitApp, displayInterstitialAd } from '@sl/helpers';
import { Hamburger, DrawerItem, WhenReady } from '@sl/components';
import { ICourse } from '@sl/services/courses';
import { IProfile } from '@sl/services/profile';
import { GSContainer, GUnit, GComingSoonSeparator } from './index.styles';
import I18n from '@sl/i18n';
import shortid from 'shortid';
import { Analytics } from '@sl/config/firebase';
import { ILoadingProps } from '@sl/components/Loading/connect';

interface IProps extends ILoadingProps {
  activeCourse: ICourse;
  navigation: NavigationScreenProp<any>;
  skills: ISkill[];
  profile: IProfile;
  publishedSkills: ISkill[];
  comingSoonSkills: ISkill[];
  fetchSkills: () => void;
}

class Skills extends React.Component<IProps> {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: I18n.t(`skills.title`),
    headerLeft: <Hamburger onPress={() => navigate('DrawerOpen')} />,
    headerRight: null,
    drawerLabel: <DrawerItem label={I18n.t('skills.title')} icon="skills" />
  });

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
        <WhenReady>
          <ScrollView
            style={{ flexDirection: 'column' }}
            refreshControl={<RefreshControl refreshing={this.props.loading} onRefresh={this.props.fetchSkills} />}
          >
            {this.renderUnits(true)}
            {this.renderUnits(false)}
          </ScrollView>
        </WhenReady>
      </GSContainer>
    );
  }
}

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Skills);
