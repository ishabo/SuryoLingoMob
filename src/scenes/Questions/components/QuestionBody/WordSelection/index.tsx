import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import {
  GSAnswerBox, GSSelectionBox, GSWordBox, GSWordText,
} from './index.styles';
import { shuffle, remove } from 'lodash';
import { IAnswerProps } from '../../../index.types';
import shortid from 'shortid';

export interface IWord {
  id: string;
  word: string;
  selected: boolean;
  width?: number;
}

export interface IState {
  shuffledWords: IWord[];
  answer: IWord[];
}

export interface IProps extends IAnswerProps {
  phrase: string;
  translation: string;
  incorrectChoices: string[];
  reverse: boolean;
}

const ensureShuffeled = (words: string[]) => {
  const shuffledWords = shuffle(shuffle(words));
  if (shuffledWords === words) {
    return ensureShuffeled(words);
  } else {
    return shuffledWords;
  }
};

export default class WordSelection extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    const { reverse, phrase, translation, incorrectChoices } = this.props;
    const answerWords = (reverse ? phrase : translation).split(' ');
    const wordsToShuffle = answerWords.concat(incorrectChoices);
    console.log(wordsToShuffle);
    const shuffledSentenceArray = ensureShuffeled(wordsToShuffle);
    const shuffledWords = shuffledSentenceArray.map((word: string) =>
      ({
        word,
        id: shortid.generate(),
        selected: false,
      }),
    );

    this.state = {
      shuffledWords,
      answer: [],
    };
  }

  updateShuffledWords = (updatedRecord: IWord) => {
    const shuffledWords = this.state.shuffledWords;
    const newShuffledWords = shuffledWords.map((word: IWord) =>
      word.id !== updatedRecord.id
        ? word
        : updatedRecord,
    );

    this.setState({ shuffledWords: newShuffledWords });
  }

  answerHasWord = (word: IWord) =>
    this.state.answer.find((w: IWord) => w.word === word.word)

  updateAnswers = (word: IWord, action: 'add' | 'remove', saveCallback: () => void) => {
    const { answer } = this.state;

    if (!this.answerHasWord(word) && action === 'add') {
      answer.push(word);
    }

    if (action === 'remove') {
      remove(answer, (w: IWord) => w.word === word.word);
    }

    this.setState({ answer }, () => {
      this.props.collectAnswer(this.mapAnswerToString());
      saveCallback();
    });
  }

  mapAnswerToString = () => {
    return this.state.answer.map((word: IWord) => word.word).join(' ');
  }

  addWordToAnswer = (word: IWord) => {
    this.updateAnswers(word, 'add', () => {
      this.updateShuffledWords({ ...word, selected: true });
    });
  }

  removeWordFromAnswer = (word: IWord) => {
    this.updateAnswers(word, 'remove', () => {
      this.updateShuffledWords({ ...word, selected: false });
    });
  }

  renderAnswerWords = () => this.state.answer.map((word: IWord, _: number) =>
    <GSWordBox key={shortid.generate()}>
      {this.renderWord(word)}
    </GSWordBox>)

  renderShuffledWords = () => this.state.shuffledWords.map((word: IWord, _: number) =>
    <GSWordBox key={shortid.generate()} >
      {word.selected
        ? <GSWordText shadowed>{word.word}</GSWordText>
        : this.renderWord(word)
      }
    </GSWordBox>)

  renderWord = (word: IWord) => {
    const handleWord = (word: IWord) => this.answerHasWord(word)
      ? this.removeWordFromAnswer(word)
      : this.addWordToAnswer(word);

    return word &&
      <TouchableOpacity onPress={() => handleWord(word)}>
        <GSWordText>
          {word.word}
        </GSWordText>
      </TouchableOpacity>;
  }

  render () {
    return (
      <Container>
        <GSAnswerBox>
          {this.renderAnswerWords()}
        </GSAnswerBox>

        <GSSelectionBox>
          {this.renderShuffledWords()}
        </GSSelectionBox>
      </Container>
    );
  }
}
