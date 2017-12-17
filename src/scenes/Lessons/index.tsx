import React from 'react';
import { Container, Text, View } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import I18n from '../../i18n';
import * as Animatable from 'react-native-animatable';
import { ISkill, ILesson } from '../../services/skills/reducers';
import { enterLesson } from '../../services/progress/actions';

export interface State {
  lessons: ILesson[];
}

class Lessons extends React.Component<any, State> {

  private carousal: any;
  private cards: any;

  static navigationOptions = {
    title: I18n.t('lessons.title'),
  };

  componentDidMount () {
    this.cards.fadeInUp();
  }

  renderCards ({ item: lesson, _ }) {
    const { lessons } = this.props.navigation.state.params.skill;

    return <View style={styles.card}>
      <TouchableOpacity style={styles.navArea} onPress={() => this.props.enterLesson(lesson.id)}>
        <Text style={styles.lessonTitle}>
          {
            I18n.t('lessons.lesson.title', {
              lessonOrder: lesson.order, totalLessons: lessons.length,
            })
          }
        </Text>
        <Text style={styles.lessonNewWords}>{lesson.newWords}</Text>
      </TouchableOpacity>
    </View>;
  }

  render () {
    const skill: ISkill = this.props.navigation.state.params.skill;
    return (
      <Container style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
          <Text>{I18n.t('lessons.instruction')}</Text>
        </View>
        <Animatable.View
          ref={(c: Lessons) => this.cards = c}
          style={{ flex: 2, marginBottom: 30, alignSelf: 'center', justifyContent: 'center' }} >
          <Carousel
            ref={(c: Lessons) => this.carousal = c}
            data={skill.lessons}
            renderItem={this.renderCards.bind(this)}
            sliderWidth={380}
            itemWidth={300}
            style={{ marginTop: 300 }}
          />
        </Animatable.View>
      </Container>
    );
  }
}

const styles: any = StyleSheet.create({

  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },

  card: {
    alignItems: 'center',
    height: 300,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 1,
    shadowRadius: 2,
    backgroundColor: 'white',
  },

  navArea: {
    flex: 1,
    alignContent: 'stretch',
    justifyContent: 'center',
    height: 400,
    width: 300,
  },

  lessonTitle: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 10,
  },

  lessonNewWords: {
    alignSelf: 'center',
  },
});

const mapStateToProps = (state: any) => ({
  courses: state.courses,
});

const mapDispatchToProps = (dispatch: any) => ({
  enterLesson: (lessonId: string) => dispatch(enterLesson(lessonId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);
