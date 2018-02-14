import React from 'react';
import { Container, Content, ListItem, Body, CheckBox } from 'native-base';
import { IAnswerProps } from '../../../index.types';
import I18n from 'I18n';
import shortid from 'shortid';
import glamor from 'glamorous-native';
import { GSCustomText } from 'styles/text';

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
          <GSText>{choice}</GSText>
        </Body>
      </ListItem>,
    );
  }

  render () {
    return (
      <GSContainer>
        <GSContent>
          <GSTitle>{I18n.t('questions.multiChoice')}</GSTitle>
          {this.renderChoices()}
        </GSContent>
      </GSContainer>
    );
  }
}

export const GSContainer = glamor(Container)({
  alignSelf: 'stretch',
});

export const GSTitle = glamor(GSCustomText)({
  paddingHorizontal: 20,
  fontSize: 22,
});

export const GSText = glamor(GSCustomText)({
  paddingHorizontal: 20,
  fontSize: 18,
});

export const GSContent = glamor(Content)({
  marginTop: 20,
});
