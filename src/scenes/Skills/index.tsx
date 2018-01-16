import React from 'react';
import { Container, Text } from 'native-base';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Skill } from './components';
import { mapValues, groupBy } from 'lodash';
import { ISkill } from 'services/skills';
import { getActiveCourse, getTargetLanguage } from 'services/selectors';
import { IInitialState } from 'services/reducers';
import I18n from 'I18n';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import shortid from 'shortid';

interface State { }

class Skills extends React.Component<any, State> {

  static navigationOptions = ({ navigation: { navigate, state: { params } } }) => ({
    title: I18n.t(`courses.languages.short.${params['title']}`),
    headerRight: <HeaderRight
      title={I18n.t('courses.shortTitle')}
      navigate={() => navigate('Courses')} />,
  })

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
        icon={skill.icons.xhdpi.unlocked}
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
  targetLanguage: getTargetLanguage(state),
});

export default connect(mapStateToProps)(Skills);
