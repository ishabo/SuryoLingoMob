import * as React from 'react';
import { Platform, View, Keyboard, NativeModules } from 'react-native';
import { GSContainer, GSContent, GSTextArea, GSTextAreaContainer } from './index.styles';
import Colors from 'styles/colors';
import { isNarrowDevice } from 'helpers';

import { /*GSKeyboardCloseButton, GSKeyboardToggleButton,*/ GSKeyboardToolBar } from './index.styles';
import { KeyboardAccessoryView, KeyboardRegistry, KeyboardUtils } from 'react-native-keyboard-input';
import Keyboards, { IKeyboardActions } from 'components/Keyboards';
import { Text } from 'native-base';

const iosScrollBehavior =
  Platform.OS === 'ios' ? NativeModules.KeyboardTrackingViewManager.KeyboardTrackingScrollBehaviorNone : null;

interface IProps {
  disableKeyboard: boolean;
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
  keyboardName: string | null;
  keyboardProps: object | null;
}

export default class TextArea extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: '',
      keyboardOn: false,
      keyboardName: null,
      keyboardProps: {}
    };

    this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(this);
    this.showKeyboard = this.showKeyboard.bind(this);
    this.hideKeyboard = this.hideKeyboard.bind(this);
  }

  componentDidMount() {
    this.showKeyboard();
  }

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

  private hideKeyboard = () => {
    this.setState(
      { keyboardOn: false, keyboardName: this.props.inputLanguage === 'cl-syr' ? 'SyriacKeyboard' : 'ArabicKeyboard' },
      KeyboardUtils.dismiss
    );
  };

  private showKeyboard = () => {
    Keyboard.dismiss();

    if (this.props.disableKeyboard) {
      return;
    }

    this.setState({ keyboardName: null }, () => {
      setTimeout(() => {
        this.setState({
          keyboardOn: true,
          keyboardName: this.props.inputLanguage === 'cl-syr' ? 'SyriacKeyboard' : 'ArabicKeyboard'
        });
      }, 300);
    });
  };

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
      // this.hideKeyboard();
    }
  };

  keyboardAccessoryViewContent() {
    return this.state.keyboardOn ? (
      <GSKeyboardToolBar>
        {/* <GSKeyboardCloseButton light>
          <Icon
            name="ios-arrow-down"
            color={'black'}
            style={{
              fontSize: 25,
              width: 20,
              left: -10
            }}
          />
        </GSKeyboardCloseButton>
        <GSKeyboardToggleButton>
          <Icon
            name="ion-ios-keypad"
            color={'black'}
            style={{
              fontSize: 25,
              width: 20,
              left: -10
            }}
          />
        </GSKeyboardToggleButton> */}
      </GSKeyboardToolBar>
    ) : null;
  }

  renderCover() {
    return <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.25)' }} />;
  }

  renderStickyView() {
    return (
      <View style={{ height: 40 }}>
        <Text>BUTTON</Text>
      </View>
    );
  }
  render() {
    const keyboardName = this.props.inputLanguage === 'cl-syr' ? 'SyriacKeyboard' : 'ArabicKeyboard';
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
              numberOfLines={isNarrowDevice() ? 5 : 7}
              value={this.state.value}
              customKeyboardType={keyboardName}
              autoFocus={true}
              onFocus={this.showKeyboard}
              onTouchStart={this.showKeyboard}
              onChangeText={this.onChange}
              keyboardAppearance="light"
              rtl={Platform.OS === 'ios'}
              innerRef={(c: TextArea) => (this.textArea = c)}
              lang={this.state.value.length === 0 ? 'cl-ara' : this.props.inputLanguage}
            />
          </GSTextAreaContainer>
        </GSContent>

        <KeyboardAccessoryView
          iOSScrollBehavior={iosScrollBehavior}
          renderContent={this.keyboardAccessoryViewContent}
          kbInputRef={this.textArea}
          kbComponent={this.state.keyboardName}
          onItemSelected={this.receivedKeyboardData}
          revealKeyboardInteractive
          style={{ flex: 1 }}
        />
      </GSContainer>
    );
  }
}

KeyboardRegistry.registerKeyboard('SyriacKeyboard', () => Keyboards.SyriacKeyboard);
KeyboardRegistry.registerKeyboard('ArabicKeyboard', () => Keyboards.ArabicKeyboard);
