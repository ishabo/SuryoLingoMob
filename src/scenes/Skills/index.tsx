import React from 'react';
import { Container } from 'native-base';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../i18n';
import Skill from './Skill';
import { mapValues, groupBy } from 'lodash';
import { ISkill } from '../../services/skills/reducers';
import { ICourse } from '../../services/courses/reducers';
// import Colors from '../../styles/colors';
// import glamor from 'glamorous-native';
import shortid from 'shortid';

interface State { }

class Skills extends React.Component<any, State> {

  static navigationOptions = {
    title: I18n.t('skillsList'),
    headerRight: null,
    headerLeft: null,
    goBack: false,
    cardStack: {
      transition: (previousRoute: any) => { // configure the animation here 
        alert(previousRoute);
      },
    },
  };

  private goToLessons = (skill: ISkill) => {
    const { navigate } = this.props.navigation;
    const course = this.props.courses.find((course: ICourse) => skill.courseId === course.id);
    navigate('Lessons', { skill, course });
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
      <Skill key={`skill_${skill.id}`}
        skillData={skill}
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

// const GSLevel = glamor.view({
//   alignItems: 'center',
//   marginHorizontal: 50,
//   marginVertical: 20,
//   borderRadius: 5,
//   backgroundColor: Colors.lightGray,
//   padding: 10,
// });

const mapStateToProps = (state: any) => ({
  skills: state.skills,
  courses: state.courses,
  profile: state.profile,
});

export default connect(mapStateToProps)(Skills);
