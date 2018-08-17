import * as React from 'react';
import { dashify } from 'helpers';
import { GSHintedSentence, GSSentence } from './index.styles';
import PopoverTooltip from 'react-native-popover-tooltip';
import { Keyboard, View } from 'react-native';
import { IWordHint } from 'services/dictionaries';
import { ISentence } from 'services/questions';
import { detectLanguage } from 'helpers/language';

export interface IProps {
  sentence: ISentence;
  lang: TLangs;
  obscureText?: boolean;
  style?: object;
}

interface IHint {
  label: string;
  onPress: () => void;
}

interface IState {
  keyboardOpen: boolean;
}

const splitTranslations = (translations: string) => (translations ? translations : '').split('|');

export default class Phrase extends React.Component<IProps, IState> {
  state = {
    keyboardOpen: false
  };

  keyboardDidShowListener;
  keyboardDidHideListener;

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  private keyboardDidShow = () => {
    this.setState({ keyboardOpen: true });
  };

  private keyboardDidHide = () => {
    this.setState({ keyboardOpen: false });
  };

  private obscureText = (text: string) => (this.props.obscureText ? dashify(text) : text);

  private renderText = (
    text: string,
    hasTooltip: boolean = false,
    onPress: () => void = () => {},
    style: object = {}
  ) => (
    <GSSentence
      onPress={onPress}
      hasTooltip={hasTooltip}
      style={this.props.style || { ...style }}
      lang={detectLanguage(text)}
    >
      {this.obscureText(text)}
    </GSSentence>
  );

  private renderHint = (translations: string): IHint[] =>
    splitTranslations(translations).map((label: string) => ({
      label,
      onPress: () => {}
    }));

  private toggleOnPress = tooltip => () => {
    let time = 0;
    if (this.state.keyboardOpen) {
      Keyboard.dismiss();
      time = 100;
    }
    setTimeout(() => this[tooltip].toggle(), time);
  };

  render() {
    const { sentence } = this.props;

    const style = { marginRight: 5, marginTop: 2 };
    return (
      <GSHintedSentence>
        {sentence.hintified === null
          ? this.renderText(sentence.raw, false, () => {}, { marginRight: 10 })
          : sentence.hintified.map((word: IWordHint, index: number) => {
              if (word.translations && word.translations.length > 0) {
                const tooltip = `tooltip${index}`;
                const buttonCompoent = this.renderText(word.word, true, this.toggleOnPress(tooltip));
                return (
                  <PopoverTooltip
                    ref={(c: Phrase) => (this[tooltip] = c)}
                    key={word.key}
                    buttonComponent={buttonCompoent}
                    items={this.renderHint(word.translations)}
                    animationType="spring"
                    componentWrapperStyle={style}
                    onRequestClose={() => alert('adads')}
                  />
                );
              } else {
                return (
                  <View key={word.key} style={style}>
                    {this.renderText(word.word, false)}
                  </View>
                );
              }
            })}
      </GSHintedSentence>
    );
  }
}
