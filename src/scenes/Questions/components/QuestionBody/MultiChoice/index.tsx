import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, ListItem, Body, Text, CheckBox } from 'native-base';
import { IAnswerProps } from '../../../index.types';
import I18n from 'I18n';
import shortid from 'shortid';

interface IProps extends IAnswerProps {
  phrase: string;
  translation: string;
  incorrectChoices: string[];
  reverse: boolean;
}

interface IState {
  answer: string[];
}

export default class MultiChoice extends React.Component<IProps, IState> {

  public state = {
    answer: [],
  };

  updateAnswers = (choice: string) => {
    const { answer } = this.state;
    const index: number = answer.indexOf(choice);

    if (index >= 0) {
      answer.splice(index, 1);
    } else {
      answer.push(choice);
    }

    this.setState({ answer }, () => {
      this.props.collectAnswer(answer);
    });
  }

  isChoiceSelected = (choice: string): boolean => {
    const index: number = this.state.answer.indexOf(choice);
    return index >= 0;
  }

  renderChoices = () => {
    const { reverse, phrase, translation, incorrectChoices } = this.props;
    const correctChoice = reverse ? phrase : translation;
    const choices = [correctChoice].concat(incorrectChoices);

    return choices.map((choice: string) =>
      <ListItem
        style={{ backgroundColor: 'transparent' }}
        key={shortid.generate()}
        onPress={() => this.updateAnswers(choice)}>
        <CheckBox
          onPress={() => this.updateAnswers(choice)}
          checked={this.isChoiceSelected(choice)}
        />
        <Body>
          <Text style={styles.text}>{choice}</Text>
        </Body>
      </ListItem>,
    );
  }

  render () {
    return (
      <Container style={styles.container}>
        <Content padder style={styles.content}>
          <Text style={styles.text}>{I18n.t('questions.multiChoice')}</Text>
          {this.renderChoices()}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  content: {
    marginTop: 20,
  },
  text: {
    textAlign: 'left',
  },
});
