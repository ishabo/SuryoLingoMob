import React from 'react';
import { Container, Content } from 'native-base';
import { IAnswerProps } from '../../../index.types';
import I18n from 'I18n';
import shortid from 'shortid';
import glamor from 'glamorous-native';
import { GSCustomText } from 'styles/text';
import { ICourse } from 'services/courses';
import Colors from 'styles/colors';
import { TouchableOpacity } from 'react-native';

interface IProps extends IAnswerProps {
  phrase: string;
  translation: string;
  incorrectChoices: string[];
  reverse: boolean;
  course: ICourse;
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

  getWordTextLang = () => {
    const { reverse, course } = this.props;
    return reverse ? course.targetLanguage.shortName : course.learnersLanguage.shortName;
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
      <TouchableOpacity key={shortid.generate()} onPress={() => this.updateAnswers(choice)}>
        <GSChoice checked={this.isChoiceSelected(choice)}>
          <GSRadio checked={this.isChoiceSelected(choice)} />
          <GSText lang={this.getWordTextLang()}>{choice}</GSText>
        </GSChoice>
      </TouchableOpacity>
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

export const GSChoice = glamor.view<{ checked: boolean }>(
  {
    borderWidth: 2,
    borderColor: Colors.lightBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 4,
    flexDirection: 'row',
    alignContent: 'center',
  },
  props => ({
    backgroundColor: props.checked ? Colors.lightBlue : 'transparent',
  }),
);

export const GSRadio = glamor.view<{ checked: boolean }>(
  {
    borderRadius: 50,
    borderWidth: 1,
    width: 20,
    height: 20,
    borderColor: Colors.lightGray,
    alignSelf: 'center',
  },
  props => ({
    backgroundColor: props.checked ? Colors.blue : 'transparent',
  }),
);
export const GSContainer = glamor(Container)({
  alignSelf: 'stretch',
});

export const GSTitle = glamor(GSCustomText)({
  paddingHorizontal: 10,
  fontSize: 22,
});

export const GSText = glamor(GSCustomText)({
  paddingHorizontal: 30,
  fontSize: 20,
  alignSelf: 'center',
});

export const GSContent = glamor(Content)({
  marginTop: 20,
});
