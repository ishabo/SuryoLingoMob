import * as React from 'react';
import { connect } from 'react-redux';
import { Platform, View, NativeModules, Keyboard } from 'react-native';
import { GSContainer, GSContent, GSTextArea, GSTextAreaContainer, GSKeyboardToggleButton } from './index.styles';
import Colors from 'styles/colors';
import { isNarrowDevice } from 'helpers';
import { KeyboardAccessoryView, KeyboardRegistry, KeyboardUtils } from 'react-native-keyboard-input';
import Keyboards from 'components/Keyboards';
import { Icon } from 'native-base';
import { toggleCustomKeyboard, setPreferences } from 'services/preferences/actions';
const iosScrollBehavior = Platform.OS === 'ios' ? NativeModules.KeyboardTrackingViewManager.KeyboardTrackingScrollBehaviorNone : null;
class TextArea extends React.Component {
    constructor(props) {
        super(props);
        this.refreshCustomKeyboard = () => {
            setTimeout(() => {
                this.setState({ customKeyboardEnabled: false }, () => {
                    this.setState({ customKeyboardEnabled: true }, this.textArea.focus);
                });
            }, 100);
        };
        this.keyboardDidShow = () => {
            this.setState({
                keyboardOn: true
            });
        };
        this.keyboardDidHide = () => {
            this.setState({ keyboardOn: false });
        };
        this.onChange = value => {
            this.setState({ value }, () => {
                this.props.captureInput(value);
            });
        };
        this.updateValue = (key) => {
            const value = this.state.value + key;
            this.setState({ value }, () => {
                this.props.captureInput(value);
            });
        };
        this.deleteBack = () => {
            const { value } = this.state;
            this.onChange(value.slice(0, -1));
        };
        this.getCustomKeyboard = () => (this.props.inputLanguage === 'cl-syr' ? 'SyriacKeyboard' : 'ArabicKeyboard');
        this.receivedKeyboardData = (_, params) => {
            switch (params.action) {
                case 'addChar':
                    this.updateValue(params.value);
                    break;
                case 'removeChar':
                    this.deleteBack();
                    break;
                case 'submitAndClose':
                    this.props.onSubmit();
                    KeyboardUtils.dismiss();
                    break;
                default:
            }
        };
        this.toggleCustomKeyboard = () => {
            this.props.toggleCustomKeyboard();
        };
        this.setNativeKeyboard = () => {
            this.props.setPreferences({ customKeyboardEnabled: false });
        };
        this.shouldDisplayCustomKeyabord = () => Platform.OS === 'android';
        this.state = {
            value: '',
            keyboardOn: false,
            nextButtonBottomPosition: 20,
            customKeyboardEnabled: false,
            firstLoad: true
        };
    }
    componentDidMount() {
        if (this.props.customKeyboardEnabled && Platform.OS === 'android') {
            this.refreshCustomKeyboard();
        }
        else {
            this.textArea.focus();
        }
        setTimeout(() => {
            this.setState({ firstLoad: false });
        }, 500);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.customKeyboardEnabled && !this.props.customKeyboardEnabled) {
            this.textArea.focus();
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (!state.firstLoad && Platform.OS === 'android') {
            return { customKeyboardEnabled: props.customKeyboardEnabled };
        }
        else {
            return {};
        }
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    renderCover() {
        return React.createElement(View, { style: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.25)' } });
    }
    renderKeyboardToggleButton() {
        return (React.createElement(GSKeyboardToggleButton, { onPress: this.toggleCustomKeyboard },
            React.createElement(Icon, { type: "Entypo", name: "keyboard", style: {
                    fontSize: 40,
                    color: this.props.customKeyboardEnabled ? 'gray' : 'blue',
                    marginRight: 4
                } })));
    }
    render() {
        return (React.createElement(GSContainer, null,
            React.createElement(GSContent, null,
                React.createElement(GSTextAreaContainer, null,
                    React.createElement(GSTextArea, { placeholder: this.props.placeholder, placeholderTextColor: Colors.gray, multiline: true, autoCorrect: false, onTouchStart: this.setNativeKeyboard, blurOnSubmit: false, onSubmitEditing: this.props.onSubmit, underlineColorAndroid: "rgba(0,0,0,0)", numberOfLines: isNarrowDevice() ? 4 : 5, value: this.state.value, onChangeText: this.onChange, keyboardAppearance: "light", rtl: Platform.OS === 'ios', innerRef: (c) => (this.textArea = c), lang: this.state.value.length === 0 ? 'cl-ara' : this.props.inputLanguage, accessible: false }),
                    Platform.OS === 'android' && this.renderKeyboardToggleButton())),
            this.shouldDisplayCustomKeyabord() && (React.createElement(KeyboardAccessoryView, { androidAdjustResize: true, iOSScrollBehavior: iosScrollBehavior, kbInputRef: this.textArea, kbComponent: this.state.customKeyboardEnabled ? this.getCustomKeyboard() : null, onItemSelected: this.receivedKeyboardData, revealKeyboardInteractive: true, style: { flex: 1 } }))));
    }
}
const mapStateToProps = (state) => ({
    customKeyboardEnabled: state.preferences.customKeyboardEnabled
});
const mapDispatchToProps = {
    toggleCustomKeyboard,
    setPreferences
};
export default connect(mapStateToProps, mapDispatchToProps)(TextArea);
KeyboardRegistry.registerKeyboard('SyriacKeyboard', () => Keyboards.SyriacKeyboard);
KeyboardRegistry.registerKeyboard('ArabicKeyboard', () => Keyboards.ArabicKeyboard);
//# sourceMappingURL=index.js.map