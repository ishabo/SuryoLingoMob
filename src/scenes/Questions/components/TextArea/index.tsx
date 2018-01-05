import React from 'react';
import { Platform, Keyboard } from 'react-native';

import CustomKeyboard from '../CustomKeyboard';
import Config from 'config/';
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

  private keyboardWillShowListener;
  private keyboardWillHideListener;

  private keyboardWillShow = () => {
    this.setState({ keyboardOn: true });
  }

  private keyboardWillHide = () => {
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
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount () {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
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
            letters={Config.syriacLetters}
            vowels={Object.values(Config.syriacVowels)}
            onKeyPress={this.updateValue}
            onBackSpacePress={() => this.deleteBack()}
            onSpacePress={() => this.updateValue(' ')}
          />}
        </GSContent>
      </GSContainer>
    );
  }
}
