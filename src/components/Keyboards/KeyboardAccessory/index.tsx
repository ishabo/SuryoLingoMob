import * as React from 'react';
import { Platform, NativeModules } from 'react-native';
import { KeyboardAccessoryView, KeyboardRegistry, KeyboardUtils } from 'react-native-keyboard-input';
import Keyboards, { IKeyboardActions } from 'components/Keyboards';
// import { Icon } from 'native-base';
import { /*GSKeyboardCloseButton, GSKeyboardToggleButton,*/ GSKeyboardToolBar } from './index.styles';

interface IProps {
  inputRef: () => React.RefObject<any>;
  inputLanguage: TLangs;
  onSubmit?: () => void;
  onUpdate?: (value: string) => void;
  onDelete?: () => void;
}

interface IState {
  keyboardOn: boolean;
  keyboardName: string | null;
  keyboardProps: object | null;
}

const iosScrollBehavior =
  Platform.OS === 'ios' ? NativeModules.KeyboardTrackingViewManager.KeyboardTrackingScrollBehaviorNone : null;

class KeyboardAccessory extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      keyboardOn: false,
      keyboardName: null,
      keyboardProps: {}
    };
    this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(this);
    this.showKeyboard = this.showKeyboard.bind(this);
    this.hideKeyboard = this.hideKeyboard.bind(this);
  }

  componentDidMount() {
    // Keyboard.dismiss();
    this.showKeyboard();
  }

  private hideKeyboard = () => {
    this.setState(
      { keyboardOn: false, keyboardName: this.props.inputLanguage === 'cl-syr' ? 'SyriacKeyboard' : 'ArabicKeyboard' },
      KeyboardUtils.dismiss
    );
  };

  private showKeyboard = () => {
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
        this.props.onUpdate(params.value);
        break;
      case 'removeChar':
        this.props.onDelete();
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

  render() {
    return (
      <KeyboardAccessoryView
        iOSScrollBehavior={iosScrollBehavior}
        renderContent={this.keyboardAccessoryViewContent}
        kbInputRef={this.props.inputRef()}
        kbComponent={this.state.keyboardName}
        onItemSelected={this.receivedKeyboardData}
        revealKeyboardInteractive
      />
    );
  }
}

KeyboardRegistry.registerKeyboard('SyriacKeyboard', () => Keyboards.SyriacKeyboard);
KeyboardRegistry.registerKeyboard('ArabicKeyboard', () => Keyboards.ArabicKeyboard);
export default KeyboardAccessory;
