import React from 'react';
import KeyboardLayout from './KeyboardLayout';
import Language from 'config/language';

const syriac = Language['cl-syr'].keyboardKeys;
const arabic = Language['cl-ara'].keyboardKeys;

export interface IKeyboardActions {
  action: 'addChar' | 'removeChar' | 'submitAndClose' | 'close';
  value?: string;
}

export default {
  SyriacKeyboard: props => <KeyboardLayout {...props} lang={'cl-syr'} letters={syriac} layoutName="SyriacKeyboard" />,
  ArabicKeyboard: props => (
    <KeyboardLayout {...props} wide lang={'cl-ara'} letters={arabic} layoutName="ArabicKeyboard" />
  )
};
