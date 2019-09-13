import * as React from 'react';
import { Button, View } from 'native-base';
import glamor from 'glamorous-native';
import { calcWindowWidth } from 'helpers';
import { GSCustomText } from 'styles/text';
import Colors from 'styles/colors';
export default ({ disabled = false, onPress, text, lang, restProps = { success: true, wide: true } }) => {
    return React.createElement(View, { style: { height: 50 } },
        React.createElement(GSButton, Object.assign({}, restProps, { rounded: true, block: true, onPressIn: onPress, disabled: disabled }),
            React.createElement(GSButtonText, { lang: lang, light: restProps.light }, text)));
};
const GSButton = glamor(Button)({
    alignSelf: 'stretch',
}, ({ wide, narrow }) => {
    let width;
    let alignSelf;
    if (wide) {
        width = calcWindowWidth(10);
        alignSelf = 'center';
    }
    else if (narrow) {
        width = 120;
    }
    return { width, alignSelf };
});
const GSButtonText = glamor(GSCustomText)({
    alignSelf: 'center',
}, props => ({
    color: props.light ? Colors.lightBlack : Colors.white
}));
//# sourceMappingURL=index.js.map