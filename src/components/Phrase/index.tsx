import * as React from 'react';
import { dashify } from 'helpers';
import { GSHintedSentence, GSSentence } from './index.styles';
import PopoverTooltip from 'react-native-popover-tooltip';
import { Keyboard, View } from 'react-native';
import { IWordHint } from 'services/dictionaries';
import { ISentence } from 'services/questions';
import { detectLanguage } from 'helpers/language';
import { KeyboardUtils } from 'react-native-keyboard-input';

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
      KeyboardUtils.dismiss();

      time = 100;
    }
    setTimeout(this[tooltip].toggle, time);
  };

  private renderHintifiedWord = (hintifiedWord: IWordHint, index: number) => {
    const style = { marginRight: 5, marginTop: 2 };
    const tooltip = `tooltip${index}`;
    const { key, word, translations } = hintifiedWord;

    if (translations && translations.length > 0) {
      const buttonCompoent = this.renderText(word, true, this.toggleOnPress(tooltip));
      const items = this.renderHint(translations);
      const ref = (c: Phrase) => (this[tooltip] = c);
      return (
        <PopoverTooltip
          ref={ref}
          items={items}
          key={key}
          animationType="spring"
          componentWrapperStyle={style}
          labelStyle={{ fontFamily: 'Arial' }}
          buttonComponent={buttonCompoent}
        />
      );
    } else {
      return (
        <View key={key} style={style}>
          {this.renderText(word, false)}
        </View>
      );
    }
  };

  render() {
    const { sentence } = this.props;

    return (
      <GSHintedSentence>
        {sentence.hintified === null
          ? this.renderText(sentence.raw, false, () => {}, { marginRight: 10 })
          : sentence.hintified.map(this.renderHintifiedWord)}
      </GSHintedSentence>
    );
  }
}
