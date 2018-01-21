import React from 'react';
import { Platform, Keyboard } from 'react-native';
import { CustomKeyboard } from 'components';
import Language from 'config/language';
import { GSContainer, GSContent, GSTextArea, GSTextAreaContainer } from './index.styles';

interface IProps {
  placeholder: string;
  captureInput: (input: string) => void;
  showCustomKeyboard: boolean;
  targetLanguage: TLangs;
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

  private textArea;

  private showCustomKeyboard = () => {
    return this.props.showCustomKeyboard && this.state.keyboardOn === false;
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
            letters={Language[this.props.targetLanguage].letters}
            onKeyPress={this.updateValue}
            onBackSpacePress={() => this.deleteBack()}
            onSpacePress={() => this.updateValue(' ')}
          />}
        </GSContent>
      </GSContainer>
    );
  }
}
