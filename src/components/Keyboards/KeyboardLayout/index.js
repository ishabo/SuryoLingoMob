import * as React from 'react';
import { View } from 'react-native';
import shortid from 'shortid';
import { GSBackSpaceKey, GSContainer, GSContent, GSKey, GSIcon, GSKeyText, GSSpaceKey } from './index.styles';
import { KeyboardRegistry } from 'react-native-keyboard-input';
class KeyboardLayout extends React.Component {
    constructor() {
        super(...arguments);
        this.listKeys = (keys, style = { fontSize: 14, paddingTop: -23 }) => keys &&
            keys.map((key) => (React.createElement(GSKey, { key: shortid.generate(), onPress: this.onPress(() => {
                    this.onKeyPress(key);
                }) },
                React.createElement(GSKeyText, { lang: this.props.lang, style: Object.assign({}, style) }, key))));
        this.onPress = (pressFunction) => () => {
            pressFunction();
        };
        this.onKeyPress = (value) => {
            this.onItemSelected({
                value,
                action: 'addChar'
            });
        };
        this.onBackSpacePress = () => {
            this.onItemSelected({
                value: null,
                action: 'removeChar'
            });
        };
        this.onItemSelected = (params) => {
            KeyboardRegistry.onItemSelected(this.props.layoutName, params);
        };
        this.listRows = (letters) => letters.map((row) => React.createElement(GSContent, { key: shortid.generate() }, this.listKeys(row)));
    }
    render() {
        return (React.createElement(GSContainer, null,
            React.createElement(React.Fragment, null, this.listRows(this.props.letters)),
            React.createElement(GSContent, null,
                React.createElement(GSBackSpaceKey, { onPress: this.onPress(this.onBackSpacePress) },
                    React.createElement(GSIcon, { name: "backspace" })),
                React.createElement(GSSpaceKey, { onPress: this.onPress(() => this.onKeyPress(' ')) },
                    React.createElement(View, null)))));
    }
}
export default KeyboardLayout;
//# sourceMappingURL=index.js.map