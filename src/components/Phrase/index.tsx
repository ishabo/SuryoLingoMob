import React, { useEffect, useState, useRef } from 'react'
import { Keyboard, View } from 'react-native'
import * as PopoverTooltip from 'react-native-popover-tooltip'
import { dashify } from '@sl/helpers'
import { IWordHint } from '@sl/services/dictionaries'
import { ISentence } from '@sl/services/questions'
import { detectLanguage } from '@sl/helpers/language'
import { KeyboardUtils } from 'react-native-keyboard-input'
import { GSHintedSentence, GSSentence } from './index.styles'

export interface IProps {
  sentence: ISentence
  lang: TLangs
  obscureText?: boolean
  style?: object
}

interface IHint {
  label: string
  onPress: () => void
}

const splitTranslations = (translations: string) =>
  (translations || '').split('|')

const Phrase: React.FC<IProps> = ({ sentence, obscureText, style }) => {
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const tooltipRefs = useRef(new Map())

  const keyboardDidShow = () => {
    setKeyboardOpen(true)
  }

  const keyboardDidHide = () => {
    setKeyboardOpen(false)
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    )
    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const getObscureText = (text: string): string =>
    obscureText ? dashify(text) : text

  const renderText = (
    text: string,
    hasTooltip: boolean = false,
    onPress: () => void = () => {},
    defaultStyle: object = {},
  ) => (
    <GSSentence
      onPress={onPress}
      hasTooltip={hasTooltip}
      style={style || { ...defaultStyle }}
      lang={detectLanguage(text)}
    >
      {getObscureText(text)}
    </GSSentence>
  )

  const renderHint = (translations: string): IHint[] =>
    splitTranslations(translations).map((label: string) => ({
      label,
      onPress: () => {},
    }))

  const toggleOnPress = (index: number) => () => {
    let time = 0
    if (keyboardOpen) {
      Keyboard.dismiss()
      KeyboardUtils.dismiss()
      time = 600
    }
    setTimeout(() => {
      tooltipRefs.current.get(index).toggle()
    }, time)
  }

  const setPopoverTooltipRef = (index: number) => (el: PopoverTooltip) =>
    tooltipRefs.current.set(index, el)

  const renderHintifiedWord = (hintifiedWord: IWordHint, index: number) => {
    const { key, word, translations } = hintifiedWord

    if (translations && translations.length > 0) {
      const buttonCompoent = renderText(word, true, toggleOnPress(index))
      const items = renderHint(translations)
      // https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks
      return (
        <PopoverTooltip
          ref={setPopoverTooltipRef(index)}
          items={items}
          key={key}
          animationType='spring'
          componentWrapperStyle={{ marginRight: 5, marginTop: 2 }}
          labelStyle={{ fontFamily: 'Arial' }}
          buttonComponent={buttonCompoent}
        />
      )
    }
    return (
      <View key={key} style={{ marginRight: 5, marginTop: 2 }}>
        {renderText(word, false)}
      </View>
    )
  }

  return (
    <GSHintedSentence>
      {sentence.hintified === null
        ? renderText(sentence.raw, false, () => {}, { marginRight: 10 })
        : sentence.hintified.map(renderHintifiedWord)}
    </GSHintedSentence>
  )
}

export default Phrase
