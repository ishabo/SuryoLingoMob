import React from 'react';
import { Platform, Keyboard } from 'react-native';

import CustomKeyboard from '../CustomKeyboard';
import Language from 'config/language';
import { GSContainer, GSContent, GSTextArea, GSTextAreaContainer } from './index.styles';

interface IProps {
  placeholder: string;
  captureInput: (input: string) => void;
  showSyriacKeyboard: boolean;
}

interface IState {
  value: string;
  keyboardOn: boolean;
}

export default class TextArea extends React.Component<IProps, IState> {

  state = {
    value: '',
    keyboardOn: false,
  };

  private keyboardDidShowListener;
  private keyboardDidHideListener;

  private keyboardDidShow = () => {
    this.setState({ keyboardOn: true });
  }

  private keyboardDidHide = () => {
    this.setState({ keyboardOn: false });
  }

  onChange = (value) => {
    this.setState({ value }, () => {
      this.props.captureInput(value);
    });
  }

  updateValue = (key: string) => {
    const value = this.state.value + key;
    this.setState({ value }, () => {
      this.props.captureInput(value);
    });
  }

  deleteBack = () => {
    const { value } = this.state;
    this.setState({ value: value.slice(0, -1) }, () => {
      this.props.captureInput(this.state.value);
    });
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  private textArea;

  private showCustomKeyboard = () => {
    return this.props.showSyriacKeyboard && this.state.keyboardOn === false;
  }

  render () {
    return (
      <GSContainer>
        <GSContent>
          <GSTextAreaContainer>
            <GSTextArea
              placeholder={this.props.placeholder}
              multiline
              numberOfLines={4}
              value={this.state.value}
              onChangeText={this.onChange}
              keyboardAppearance="light"
              onSubmitEditing={Keyboard.dismiss}
              rtl={Platform.OS === 'ios'}
              innerRef={(c: TextArea) => this.textArea = c}
            />
          </GSTextAreaContainer>

          {this.showCustomKeyboard() && <CustomKeyboard
            letters={Language.syriacLetters}
            vowels={Object.values(Language.syriacVowels)}
            onKeyPress={this.updateValue}
            onBackSpacePress={() => this.deleteBack()}
            onSpacePress={() => this.updateValue(' ')}
          />}
        </GSContent>
      </GSContainer>
    );
  }
}
