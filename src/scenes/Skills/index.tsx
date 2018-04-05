import * as React from 'react';
import { Container } from 'native-base';
import { ScrollView, View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Skill } from './components';
import { mapValues, groupBy } from 'lodash';
import { ISkill } from 'services/skills';
import { getActiveCourse } from 'services/selectors';
import { IInitialState } from 'services/reducers';
import { NavigationScreenProp } from 'react-navigation';

import I18n from 'I18n';
import shortid from 'shortid';
import { exitApp } from 'helpers';
import { Hamburger } from 'components';
import { ICourse } from 'services/courses';
import { IProfile } from 'services/profile';
import { GSDrawerLabel } from 'scenes/Drawer';

interface IProps {
  activeCourse: ICourse;
  navigation: NavigationScreenProp<any>;
  skills: ISkill[];
  profile: IProfile;
}

class Skills extends React.Component<IProps> {

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: I18n.t(`skills.title`),
    headerLeft: <Hamburger onPress={() => navigate('DrawerOpen')} />,
    drawerLabel: <GSDrawerLabel>{I18n.t('skills.title')}</GSDrawerLabel>,
    headerRight: null,

  });

  componentWillMount () {
    if (!this.props.activeCourse) {
      this.goToCourses();
    }
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    exitApp();
    return false;
  }

  goToCourses = () => {
    const { navigate } = this.props.navigation;
    navigate('Courses');
  }

  private goToLessons = (skill: ISkill) => {
    const { navigate } = this.props.navigation;
    navigate('Lessons', { skill });
  }

  private renderUnits () {
    const skills = mapValues(groupBy(this.props.skills, 'unit'));
    const units = Object.keys(skills);

    const mappedUnits: any[] = [];

    units.forEach((unit: string | number) => {
      mappedUnits.push(<View key={shortid.generate()}
        style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
        {this.renderSkills(skills[unit])}
      </View>);
    });

    return mappedUnits;
  }

  private enterSkill = (skill: ISkill) => {
    this.isSkillActive(skill) ? this.goToLessons(skill) : alert(I18n.t('skills.skillInactive'));
  }

  private isSkillActive = (skill: ISkill): boolean =>
    skill.active || this.props.profile.isTester

  private renderSkills (skills: ISkill[]) {
    return skills.map((skill: ISkill) =>
      <Skill
        key={`skill_${skill.id}`}
        name={skill.name}
        icon={skill.icon}
        progress={skill.progress ? skill.progress : 0}
        unlocked={this.isSkillActive(skill)}
        onSkillsClick={() => this.enterSkill(skill)} />);
  }

  render () {
    return (
      <Container>
        <ScrollView style={{ flexDirection: 'column' }}>
          {this.renderUnits()}
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state: IInitialState) => ({
  profile: state.profile,
  skills: state.skills,
  activeCourse: getActiveCourse(state),
});

export default connect(mapStateToProps)(Skills);
