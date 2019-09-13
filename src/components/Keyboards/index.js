import React from 'react';
import KeyboardLayout from './KeyboardLayout';
import language from 'config/language';
const syriac = language['cl-syr'].keyboardKeys;
const arabic = language['cl-ara'].keyboardKeys;
export default {
    SyriacKeyboard: props => React.createElement(KeyboardLayout, Object.assign({}, props, { lang: 'cl-syr', letters: syriac, layoutName: "SyriacKeyboard" })),
    ArabicKeyboard: props => (React.createElement(KeyboardLayout, Object.assign({}, props, { wide: true, lang: 'cl-ara', letters: arabic, layoutName: "ArabicKeyboard" })))
};
//# sourceMappingURL=index.js.map