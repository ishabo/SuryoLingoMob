import React from 'react';
import { Container, Text, View } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import I18n from '../../i18n';
import * as Animatable from 'react-native-animatable';
import { IModule, ILesson } from '../../services/modules/reducers';
import { ICourse } from '../../services/courses/reducers';

export interface State {
  lessons: ILesson[];
}

export default class Lessons extends React.Component<any, State> {

  private carousal: any;
  private cards: any;
  static navigationOptions = {
    title: I18n.t('lessons.title')
  };

  componentDidMount () {
    this.cards.fadeInUp();
  }

  goToQuestions = (lesson: ILesson) => {
    const { navigate } = this.props.navigation;
    const course: ICourse = this.props.navigation.state.params.course;
    const { questions } = lesson;

    navigate('Questions', {
      course,
      questions,
      currentQuestionIndex: 0l
    });
  }

  renderCards ({ item: lesson, _ }) {
    const { lessons } = this.props.navigation.state.params.module;

    return <View style={styles.card}>
      <TouchableOpacity style={styles.navArea} onPress={() => { this.goToQuestions(lesson) }}>
        <Text style={styles.lessonTitle}>
          {I18n.t('lessons.lesson.title', { lessonId: lesson.id, totalLessons: lessons.length })}
        </Text>
        <Text style={styles.lessonNewWords}>{lesson.newWords.join(', ')}</Text>
      </TouchableOpacity>
    </View>;
  }

  render () {
    const module: IModule = this.props.navigation.state.params.module;
    return (
      <Container style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
          <Text>{I18n.t('lessons.instruction')}</Text>
        </View>
        <Animatable.View ref={(c) => this.cards = c} style={{ flex: 2, marginBottom: 30, alignSelf: 'center', justifyContent: 'center' }} >
          <Carousel
            ref={(c) => { this.carousal = c }}
            data={module.lessons}
            renderItem={this.renderCards.bind(this)}
            sliderWidth={380}
            itemWidth={300}
            style={{ marginTop: 300 }}
          />
        </Animatable.View>
      </Container>
    )
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
    shadowOffset: { width: 4, height: 4, },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 1,
    shadowRadius: 2,
    backgroundColor: 'white'
  },

  navArea: {
    flex: 1,
    alignContent: 'stretch',
    justifyContent: 'center',
    height: 400,
    width: 300
  },

  lessonTitle: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 10
  },

  lessonNewWords: {
    alignSelf: 'center'
  }
});