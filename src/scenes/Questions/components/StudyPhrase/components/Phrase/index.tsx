import React from 'react';
import { IWordHint, dashify } from 'helpers';
import { GSHintedSentence, GSSentence } from './index.styles';
import PopoverTooltip from 'react-native-popover-tooltip';
import { View } from 'react-native';

type TSentence = string | IWordHint[];

export interface IProps {
  sentence: TSentence;
  lang: TLangs;
  obscureText?: boolean;
  style?: object;
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

  private obscureText = (text: string) => this.props.obscureText ? dashify(text) : text;

  private renderText = (
    text: string,
    hasTooltip: boolean = false,
    onPress: () => void = () => { },
    style: object = {}
  ) =>
    <GSSentence
      onPress={onPress}
      hasTooltip={hasTooltip}
      style={this.props.style || { ...style }}
      lang={this.props.lang}>
      {this.obscureText(text)}
    </GSSentence>

  private renderHint = (translations: string): IHint[] =>
    splitTranslations(translations).map((label: string) => ({
      label, onPress: () => { },
    }))

  render () {
    const { sentence } = this.props;

    const style = { marginRight: 5, marginTop: 2 };
    return <GSHintedSentence>
      {typeof sentence === 'string' ? this.renderText(sentence, false, () => { }, { marginRight: 10 }) :
        sentence.map((word: IWordHint, index: number) => {
          if (word.translations && word.translations.length > 0) {
            const tooltip = `tooltip${index}`;
            const onPress = () => { this[tooltip].toggle(); };
            const buttonCompoent = this.renderText(word.word, true, onPress);
            return <PopoverTooltip
              ref={(c: Phrase) => this[tooltip] = c}
              key={word.key}
              buttonComponent={buttonCompoent}
              items={this.renderHint(word.translations)}
              animationType="timing"
              componentWrapperStyle={style}
            />;
          } else {
            return <View key={word.key} style={style}>{this.renderText(word.word, false)}</View>;
          }
        })
      }
    </GSHintedSentence>;
  }
}
