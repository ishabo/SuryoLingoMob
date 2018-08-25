import * as React from 'react';
import { connect } from 'react-redux';
import { Platform, View, NativeModules, TouchableOpacity, Keyboard } from 'react-native';
import { GSContainer, GSContent, GSTextArea, GSTextAreaContainer /*GSFakeTextArea*/ } from './index.styles';
import Colors from 'styles/colors';
import { isNarrowDevice } from 'helpers';
import { KeyboardAccessoryView, KeyboardRegistry, KeyboardUtils } from 'react-native-keyboard-input';
import Keyboards, { IKeyboardActions } from 'components/Keyboards';
import { Icon, Text } from 'native-base';
import { IInitialState } from 'services/reducers';
import { toggleCustomKeyboard, setPreferences } from 'services/preferences/actions';

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
  customKeyboardEnabled: boolean;
  toggleCustomKeyboard: () => void;
  setPreferences: (pref) => void;
}

interface IState {
  value: string;
  keyboardOn: boolean;
  keyboardName: string | null;
  keyboardProps: object | null;
}

class TextArea extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: '',
      keyboardOn: false,
      keyboardName: null,
      keyboardProps: {}
    };

    this.showKeyboard = this.showKeyboard.bind(this);
    this.hideKeyboard = this.hideKeyboard.bind(this);
  }

  keyboardDidShowListener;
  keyboardDidHideListener;

  componentDidMount() {
    this.textArea.focus();

    if (this.props.customKeyboardEnabled) {
      this.showKeyboard();
    }

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  keyboardDidShow = () => {
    this.setState({
      keyboardOn: true
    });
  };

  keyboardDidHide = () => {
    this.setState({ keyboardOn: false });
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
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

  private getCustomKeyboardType = () => (this.props.inputLanguage === 'cl-syr' ? 'SyriacKeyboard' : 'ArabicKeyboard');

  private hideKeyboard = () => {
    this.setState({ keyboardOn: false, keyboardName: this.getCustomKeyboardType() }, KeyboardUtils.dismiss);
  };

  private showKeyboard = () => {
    if (this.props.disableKeyboard) {
      return;
    }

    setTimeout(() => {
      this.setState({
        keyboardOn: true,
        keyboardName: this.props.customKeyboardEnabled ? this.getCustomKeyboard() : null
      });
    }, 100);
  };

  getCustomKeyboard = () => (this.props.inputLanguage === 'cl-syr' ? 'SyriacKeyboard' : 'ArabicKeyboard');

  toggleCustomKeyboard = () => {
    if (this.props.customKeyboardEnabled) {
      this.textArea.focus();
    }
    this.props.toggleCustomKeyboard();
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
    }
  };

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

  renderKeyboardToggleButton() {
    return (
      <TouchableOpacity style={{ flexDirection: 'row-reverse' }} onPress={this.toggleCustomKeyboard}>
        <Icon
          type="Entypo"
          name="keyboard"
          style={{
            fontSize: 40,
            color: this.props.customKeyboardEnabled ? 'gray' : 'blue',
            marginRight: 4
          }}
        />
      </TouchableOpacity>
    );
  }

  private setNativeKeyboard = () => {
    this.props.setPreferences({ customKeyboardEnabled: false });
  };

  render() {
    return (
      <GSContainer>
        <GSContent>
          <GSTextAreaContainer>
            <GSTextArea
              keyboardType={'ascii-capable'}
              placeholder={this.props.placeholder}
              placeholderTextColor={Colors.gray}
              multiline
              onTouchStart={this.setNativeKeyboard}
              blurOnSubmit={false}
              onSubmitEditing={this.props.onSubmit}
              underlineColorAndroid="rgba(0,0,0,0)"
              numberOfLines={isNarrowDevice() ? 4 : 5}
              value={this.state.value}
              onChangeText={this.onChange}
              keyboardAppearance="light"
              rtl={Platform.OS === 'ios'}
              innerRef={(c: TextArea) => (this.textArea = c)}
              lang={this.state.value.length === 0 ? 'cl-ara' : this.props.inputLanguage}
            />
            {/* <GSFakeTextArea onPress={this.showKeyboard}>
              <Text
                style={{
                  writingDirection: 'rtl',
                  textAlign: 'left'
                }}
              >
                {this.state.value}{' '}
                {this.props.disableKeyboard || (
                  <Animatable.Text animation="fadeIn" delay={500} iterationCount="infinite" direction="normal">
                    __
                  </Animatable.Text>
                )}
              </Text>
            </GSFakeTextArea> */}
          </GSTextAreaContainer>
          {this.renderKeyboardToggleButton()}
        </GSContent>

        <KeyboardAccessoryView
          iOSScrollBehavior={iosScrollBehavior}
          kbInputRef={this.textArea}
          kbComponent={this.props.customKeyboardEnabled ? this.getCustomKeyboard() : null}
          onItemSelected={this.receivedKeyboardData}
          revealKeyboardInteractive
          style={{ flex: 1 }}
        />
      </GSContainer>
    );
  }
}

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  customKeyboardEnabled: state.preferences.customKeyboardEnabled
});

const mapDispatchToProps: Partial<IProps> = {
  toggleCustomKeyboard,
  setPreferences
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextArea);

KeyboardRegistry.registerKeyboard('SyriacKeyboard', () => Keyboards.SyriacKeyboard);
KeyboardRegistry.registerKeyboard('ArabicKeyboard', () => Keyboards.ArabicKeyboard);
