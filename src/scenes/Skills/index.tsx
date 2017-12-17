import React from 'react';
import { Container } from 'native-base';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../i18n';
import Skill from './Skill';
import { mapValues, groupBy } from 'lodash';
import { ISkill } from '../../services/skills/reducers';
import { getActiveCourse, getTargetLanguage } from '../../services/selectors';
import shortid from 'shortid';
import { IInitialState } from '../../services/reducers';

interface State { }

class Skills extends React.Component<any, State> {

  componentDidMount () {
    const { navigation: { setParams }, title } = this.props;
    setParams({ title });
  }

  static navigationOptions: ({ activeCourse }) => ({
    title: I18n.t,
    headerRight: null,
    headerLeft: null,
    goBack: false,
    cardStack: {
      transition: (previousRoute: any) => { // configure the animation here 
        alert (previousRoute);
      },
    },
  });

  private goToLessons = (skill: ISkill) => {
    const { navigate } = this.props.navigation;
    navigate('Lessons', { skill, course: this.props.activeCourse });
  }

  // private renderLevel = (level: number) => {
  //   return <GSLevel key={shortid.generate()}>
  //     <Text>{I18n.t('skills.level', { level })}</Text>
  //   </GSLevel>;
  // }

  private renderUnits () {
    const skills = mapValues(groupBy(this.props.skills, 'unit'));
    const units = Object.keys(skills);
    // let level = 1;

    const mappedUnits: any[] = [
      // this.renderLevel(level),
    ];

    units.forEach((unit: string | number) => {

      // if (skills[unit][0].level !== level) {
      //   level = skills[unit][0].level;
      //   mappedUnits.push(this.renderLevel(level));
      // }

      mappedUnits.push(<View key={shortid.generate()}
        style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
        {this.renderSkills(skills[unit])}
      </View>);
    });

    return mappedUnits;
  }

  private renderSkills (skills: ISkill[]) {
    return skills.map((skill: ISkill) =>
      <Skill
        key={`skill_${skill.id}`}
        name={skill.name}
        progress={0}
        unlocked={true}
        onSkillsClick={() => this.goToLessons(skill)} />);
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
  skills: state.skills,
  profile: state.profile,
  activeCourse: getActiveCourse(state),
  targetLanguage: getTargetLanguage(state),
});

export default connect(mapStateToProps)(Skills);
