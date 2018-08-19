import * as React from 'react';
import { Platform, Keyboard, NativeModules } from 'react-native';
import {
  GSContainer,
  GSContent,
  GSTextArea,
  GSTextAreaContainer,
  GSKeyboardToolBar,
  GSKeyboardClosebutton
} from './index.styles';
import { KeyboardAccessoryView, KeyboardRegistry, KeyboardUtils } from 'react-native-keyboard-input';
import Colors from 'styles/colors';
import Keyboards, { IKeyboardActions } from 'components/Keyboards';
import { Icon } from 'native-base';
import TryCatch from 'components/TryCatch';

const iosScrollBehavior =
  Platform.OS === 'ios' ? NativeModules.KeyboardTrackingViewManager.KeyboardTrackingScrollBehaviorNone : null;
interface IProps {
  placeholder: string;
  captureInput: (input: string) => void;
  showCustomKeyboard: boolean;
  inputLanguage: TLangs;
  autoFocus?: boolean;
  onSubmit?: () => void;
}

interface IState {
  value: string;
  keyboardOn: boolean;
  keyboardName: string;
  keyboardProps: object;
}

export default class TextArea extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: '',
      keyboardOn: false,
      keyboardName: '',
      keyboardProps: {}
    };
    this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(this);
    this.showKeyboard = this.showKeyboard.bind(this);
    this.hideKeyboard = this.hideKeyboard.bind(this);
  }

  private showKeyboard = () => {
    Keyboard.dismiss();
    KeyboardUtils.dismiss();
    this.setState({ keyboardName: '', keyboardOn: false }, () => {
      setTimeout(() => {
        this.setState({
          keyboardOn: true,
          keyboardName: this.props.inputLanguage === 'cl-syr' ? 'SyriacKeyboard' : 'ArabicKeyboard'
        });
      }, 200);
    });
  };

  private hideKeyboard = () => {
    this.setState({ keyboardOn: false }, KeyboardUtils.dismiss);
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

  receivedKeyboardData = (_, params: IKeyboardActions) => {
    switch (params.action) {
      case 'addChar':
        this.updateValue(params.value);
        break;
      case 'removeChar':
        this.deleteBack();
        break;
      case 'submitAndClose':
        this.props.onSubmit();
        this.hideKeyboard();
        break;
      default:
        this.hideKeyboard();
    }
  };

  keyboardAccessoryViewContent() {
    return this.state.keyboardOn ? (
      <GSKeyboardToolBar>
        <GSKeyboardClosebutton light onPress={this.hideKeyboard}>
          <Icon
            name="ios-arrow-down"
            color={'black'}
            style={{
              fontSize: 25,
              width: 20,
              left: -10
            }}
          />
        </GSKeyboardClosebutton>
      </GSKeyboardToolBar>
    ) : null;
  }

  render() {
    return (
      <GSContainer>
        <GSContent>
          <GSTextAreaContainer>
            <GSTextArea
              placeholder={this.props.placeholder}
              placeholderTextColor={Colors.gray}
              multiline
              blurOnSubmit
              onSubmitEditing={this.props.onSubmit}
              numberOfLines={4}
              value={this.state.value}
              onFocus={this.showKeyboard}
              autoFocus={this.props.autoFocus === true}
              onChangeText={this.onChange}
              keyboardAppearance="light"
              rtl={Platform.OS === 'ios'}
              innerRef={(c: TextArea) => (this.textArea = c)}
              lang={this.state.value.length === 0 ? 'cl-ara' : this.props.inputLanguage}
            />
          </GSTextAreaContainer>
          <TryCatch>
            <KeyboardAccessoryView
              iOSScrollBehavior={iosScrollBehavior}
              renderContent={this.keyboardAccessoryViewContent}
              kbInputRef={this.textArea}
              kbComponent={this.state.keyboardName}
              onItemSelected={this.receivedKeyboardData}
              revealKeyboardInteractive
            />
          </TryCatch>
        </GSContent>
      </GSContainer>
    );
  }
}

KeyboardRegistry.registerKeyboard('SyriacKeyboard', () => Keyboards.SyriacKeyboard);
KeyboardRegistry.registerKeyboard('ArabicKeyboard', () => Keyboards.ArabicKeyboard);
