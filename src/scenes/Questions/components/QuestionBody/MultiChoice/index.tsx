import * as React from 'react';
import { IAnswerProps } from '../../../index.types';
import I18n from 'I18n';
import shortid from 'shortid';
import { ICourse } from 'services/courses';
import { TouchableOpacity } from 'react-native';
import { GSChoice, GSContainer, GSContent, GSRadio, GSText, GSTitle } from './index.styles';
import { shuffle } from 'lodash';

interface IProps extends IAnswerProps {
  phrase: string;
  translation: string;
  incorrectChoices: string[];
  reverse: boolean;
  course: ICourse;
}

interface IState {
  answer: string[];
  choices: string[];
}

export default class MultiChoice extends React.Component<IProps, IState> {
  public state = {
    answer: [],
    choices: []
  };

  componentDidMount() {
    const { reverse, phrase, translation, incorrectChoices } = this.props;
    const correctChoice = reverse ? phrase : translation;

    this.setState({
      choices: shuffle([correctChoice].concat(incorrectChoices))
    });
  }

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
  };

  getWordTextLang = () => {
    const { reverse, course } = this.props;
    return reverse ? course.targetLanguage.shortName : course.sourceLanguage.shortName;
  };

  isChoiceSelected = (choice: string): boolean => {
    const index: number = this.state.answer.indexOf(choice);
    return index >= 0;
  };

  renderChoices = () =>
    this.state.choices.map((choice: string) => (
      <TouchableOpacity key={shortid.generate()} onPress={() => this.updateAnswers(choice)}>
        <GSChoice checked={this.isChoiceSelected(choice)}>
          <GSRadio checked={this.isChoiceSelected(choice)} />
          <GSText lang={this.getWordTextLang()}>{choice}</GSText>
        </GSChoice>
      </TouchableOpacity>
    ));

  render() {
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
