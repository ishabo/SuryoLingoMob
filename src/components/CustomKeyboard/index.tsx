import React from 'react';
import { Keyboard, Vibration } from 'react-native';
import {
  Icon,
  Text,
} from 'native-base';
import shortid from 'shortid';
import {
  GSBackSpaceKey, GSContainer, GSContent,
  GSKey, GSKeyText, GSSpaceKey,
} from './index.styles';

interface IProps {
  letters: string[];
  onKeyPress: (key: string) => void;
  onBackSpacePress: () => void;
  onSpacePress: () => void;
  lang: TLangs;
}

const VIBRATE_DURATION = 50;

export default class extends React.Component<IProps> {

  private keyboardDidShowListener;
  private keyboardDidHideListener;

  private keyboardDidShow = () => {
    this.setState({ keyboardOn: true });
  }

  private keyboardDidHide = () => {
    this.setState({ keyboardOn: false });
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  private listKeys = (keys: string[], style:
    { fontSize: number; paddingTop?: number; },
  ) =>
    keys.map((key: string) =>
      <GSKey key={shortid.generate()} primary
        onPress={this.onPress(() => { this.props.onKeyPress(key); })}>
        <GSKeyText lang={this.props.lang} style={{ ...style }}>{key}</GSKeyText>
      </GSKey>)

  private onPress = (pressFunction: () => void) => () => {
    pressFunction();
    Vibration.vibrate(VIBRATE_DURATION, false);
  }

  render () {
    return <GSContainer>
      <GSContent>
        <GSBackSpaceKey primary onPress={this.onPress(this.props.onBackSpacePress)}>
          <Icon name="ios-arrow-forward" />
        </GSBackSpaceKey>
        {this.listKeys(this.props.letters, { fontSize: 14, paddingTop: -23 })}
        <GSSpaceKey primary onPress={this.onPress(this.props.onSpacePress)}>
          <Text>{'Space'}</Text>
        </GSSpaceKey>
      </GSContent>
    </GSContainer>;
  }
}
