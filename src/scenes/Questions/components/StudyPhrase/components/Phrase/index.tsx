import React from 'react';
import { IWordHint } from 'helpers';
import PopoverTooltip from 'react-native-popover-tooltip';
import {
  GSHintedSentence, GSSentence,
} from './index.styles';
import shortid from 'shortid';

type TSentence = string | IWordHint[];

export interface IProps {
  sentence: TSentence;
  lang: TLangs;
  obscureText?: boolean;
}

interface IHint {
  label: string;
  onPress: () => void;
}

interface IState {
  selectedWordIndex: number;
}

const splitTranslations = (translations: string) =>
  (translations ? translations : '').split('|');

export default class Phrase extends React.Component<IProps, IState> {

  private obscureText = (text: string) => {
    if (this.props.obscureText) {
      let newWord = '';
      let char: string;
      for (char in Array(text.length).keys) {
        newWord += text[char] === ' ' ? ' ' : '-';
      }
      return newWord;
    } else {
      return text;
    }
  }

  private renderText = (
    text: string,
    underline: boolean = false,
    onPress: () => void = () => { },
  ) =>
    <GSSentence
      key={shortid.generate()}
      onPress={onPress}
      underline={underline}
      lang={this.props.lang}>{this.obscureText(text)}</GSSentence>

  private renderHint = (translations: string): IHint[] =>
    splitTranslations(translations).map((label: string) => ({
      label, onPress: () => { },
    }))

  render () {
    const { sentence } = this.props;

    if (typeof sentence === 'string') {
      return this.renderText(sentence);
    }

    return <GSHintedSentence>
      {
        sentence.map((word: IWordHint, index: number) => {
          if (word.translations && word.translations.length > 0) {
            const onPress = () => { this[`tooltip${index}`].toggle(); };
            const buttonCompoent = this.renderText(word.word, true, onPress);
            return <PopoverTooltip
              ref={(c: Phrase) => this[`tooltip${index}`] = c}
              key={shortid.generate()}
              buttonComponent={buttonCompoent}
              items={this.renderHint(word.translations)}
              animationType="timing"
            />;
          } else {
            return this.renderText(word.word, false);
          }
        })
      }
    </GSHintedSentence>;
  }
}
