import React from 'react'
import language from '@sl/config/language'
import KeyboardLayout from './KeyboardLayout'

const syriac = language['cl-syr'].keyboardKeys
const arabic = language['cl-ara'].keyboardKeys

export interface IKeyboardActions {
  action: 'addChar' | 'removeChar' | 'submitAndClose' | 'close'
  value?: string
}

export default {
  SyriacKeyboard: (props) => (
    <KeyboardLayout
      {...props}
      lang={'cl-syr'}
      letters={syriac}
      layoutName='SyriacKeyboard'
    />
  ),
  ArabicKeyboard: (props) => (
    <KeyboardLayout
      {...props}
      wide
      lang={'cl-ara'}
      letters={arabic}
      layoutName='ArabicKeyboard'
    />
  ),
}
