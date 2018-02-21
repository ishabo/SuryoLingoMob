import React from 'react';
import { Container, Text, Icon } from 'native-base';
import { ScrollView, View, TouchableOpacity, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Skill } from './components';
import { mapValues, groupBy } from 'lodash';
import { ISkill } from 'services/skills';
import { getActiveCourse } from 'services/selectors';
import { IInitialState } from 'services/reducers';
import I18n from 'I18n';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import shortid from 'shortid';
import { exitApp } from 'helpers';

interface State { }

class Skills extends React.Component<any, State> {

  static navigationOptions = ({ navigation: { navigate, state: { params } } }) => ({
    title: I18n.t(`skills.title`),
    headerLeft: null,
    tabBarIcon: <Icon name="keypad" />,
    labelStyle: {
      fontSize: 16,
    },
    headerRight: <HeaderRight
      title={I18n.t('profile.userXp', { userXp: params['userXp'] ? params['userXp'] : 0 })}
      navigate={() => navigate('Profile')} />,
  })

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
    skill.active ? this.goToLessons(skill) : alert(I18n.t('skills.skillInactive'));
  }

  private renderSkills (skills: ISkill[]) {
    return skills.map((skill: ISkill) =>
      <Skill
        key={`skill_${skill.id}`}
        name={skill.name}
        icon={skill.icon}
        progress={skill.progress ? skill.progress : 0}
        unlocked={skill.active}
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

const GSTouchable = glamor(TouchableOpacity)({
  width: 100,
  height: 40,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
});

interface ITitleProps {
  title?: string;
  navigate?(): boolean;
}

const HeaderRight = ({ title, navigate }: ITitleProps) =>
  title && <GSTouchable
    onPress={() => navigate()}>
    <Text style={{ color: Colors.blue }}>
      {title}
    </Text>
  </GSTouchable > || <Text></Text>;

const mapStateToProps = (state: IInitialState) => ({
  profile: state.profile,
  skills: state.skills,
  activeCourse: getActiveCourse(state),
});

export default connect(mapStateToProps)(Skills);
