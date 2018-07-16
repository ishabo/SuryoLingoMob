import * as React from 'react';
import { Platform } from 'react-native';
import { CustomKeyboard } from 'components';
import Language from 'config/language';
import { GSContainer, GSContent, GSTextArea, GSTextAreaContainer } from './index.styles';
import Colors from 'styles/colors';

interface IProps {
  placeholder: string;
  captureInput: (input: string) => void;
  showCustomKeyboard: boolean;
  inputLanguage: TLangs;
  autoFocus?: boolean;
}

interface IState {
  value: string;
  keyboardOn: boolean;
}

export default class TextArea extends React.Component<IProps, IState> {
  state = {
    value: '',
    keyboardOn: false
  };

  onChange = value => {
    this.setState({ value }, () => {
      this.props.captureInput(value);
    });
  };

  updateValue = (key: string) => {
    const value = this.state.value + key;
    this.setState({ value }, () => {
      this.props.captureInput(value);
    });
  };

  deleteBack = () => {
    const { value } = this.state;
    this.onChange(value.slice(0, -1));
  };

  private textArea;

  render() {
    return (
      <GSContainer>
        <GSContent>
          <GSTextAreaContainer>
            <GSTextArea
              placeholder={this.props.placeholder}
              placeholderTextColor={Colors.gray}
              multiline
              numberOfLines={4}
              value={this.state.value}
              autoFocus={this.props.autoFocus === true}
              onChangeText={this.onChange}
              keyboardAppearance="light"
              rtl={Platform.OS === 'ios'}
              innerRef={(c: TextArea) => (this.textArea = c)}
              lang={this.state.value.length === 0 ? 'cl-ara' : this.props.inputLanguage}
            />
          </GSTextAreaContainer>

          {this.props.showCustomKeyboard && (
            <CustomKeyboard
              lang={this.props.inputLanguage}
              letters={Language[this.props.inputLanguage].letters}
              onKeyPress={this.updateValue}
              onBackSpacePress={() => this.deleteBack()}
              onSpacePress={() => this.updateValue(' ')}
            />
          )}
        </GSContent>
      </GSContainer>
    );
  }
}
