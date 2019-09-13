import * as React from 'react';
import { dashify } from 'helpers';
import { GSHintedSentence, GSSentence } from './index.styles';
import PopoverTooltip from 'react-native-popover-tooltip';
import { Keyboard, View } from 'react-native';
import { detectLanguage } from 'helpers/language';
import { KeyboardUtils } from 'react-native-keyboard-input';
const splitTranslations = (translations) => (translations ? translations : '').split('|');
export default class Phrase extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            keyboardOpen: false
        };
        this.keyboardDidShow = () => {
            this.setState({ keyboardOpen: true });
        };
        this.keyboardDidHide = () => {
            this.setState({ keyboardOpen: false });
        };
        this.obscureText = (text) => (this.props.obscureText ? dashify(text) : text);
        this.renderText = (text, hasTooltip = false, onPress = () => { }, style = {}) => (React.createElement(GSSentence, { onPress: onPress, hasTooltip: hasTooltip, style: this.props.style || Object.assign({}, style), lang: detectLanguage(text) }, this.obscureText(text)));
        this.renderHint = (translations) => splitTranslations(translations).map((label) => ({
            label,
            onPress: () => { }
        }));
        this.toggleOnPress = tooltip => () => {
            let time = 0;
            if (this.state.keyboardOpen) {
                Keyboard.dismiss();
                KeyboardUtils.dismiss();
                time = 100;
            }
            setTimeout(this[tooltip].toggle, time);
        };
        this.renderHintifiedWord = (hintifiedWord, index) => {
            const style = { marginRight: 5, marginTop: 2 };
            const tooltip = `tooltip${index}`;
            const { key, word, translations } = hintifiedWord;
            if (translations && translations.length > 0) {
                const buttonCompoent = this.renderText(word, true, this.toggleOnPress(tooltip));
                const items = this.renderHint(translations);
                const ref = (c) => (this[tooltip] = c);
                return (React.createElement(PopoverTooltip, { ref: ref, items: items, key: key, animationType: "spring", componentWrapperStyle: style, labelStyle: { fontFamily: 'Arial' }, buttonComponent: buttonCompoent }));
            }
            else {
                return (React.createElement(View, { key: key, style: style }, this.renderText(word, false)));
            }
        };
    }
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    render() {
        const { sentence } = this.props;
        return (React.createElement(GSHintedSentence, null, sentence.hintified === null
            ? this.renderText(sentence.raw, false, () => { }, { marginRight: 10 })
            : sentence.hintified.map(this.renderHintifiedWord)));
    }
}
//# sourceMappingURL=index.js.map