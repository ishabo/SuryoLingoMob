import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { dashify } from '@sl/helpers'
import { IWordHint } from '@sl/services/dictionaries'
import { ISentence } from '@sl/services/questions'
import { detectLanguage } from '@sl/helpers/language'
import { GSHintedSentence, GSSentence } from './index.styles'
import Tooltip from 'rn-tooltip'

export interface IProps {
  sentence: ISentence
  lang: TLangs
  obscureText?: boolean
  style?: object
}

const Phrase: React.FC<IProps> = ({ sentence, obscureText, style }) => {
  const getObscureText = (text: string): string =>
    obscureText ? dashify(text) : text

  const renderText = (
    text: string,
    hasTooltip: boolean = false,
    defaultStyle: object = { marginRight: 4 },
  ) => {
    if (typeof text === 'string') {
      return (
        <GSSentence
          hasTooltip={hasTooltip}
          style={style || { ...defaultStyle }}
          lang={detectLanguage(text)}
        >
          {getObscureText(text)}
        </GSSentence>
      )
    }
    return null
  }

  const renderTranslations = (translations: string) => {
    const items = (translations || '').split('|')
    return (
      <FlatList
        data={items}
        renderItem={({ item, index }) => <Text key={index}>{item}</Text>}
      />
    )
  }

  const renderHintifiedWord = (hintifiedWord: IWordHint) => {
    const { key, word, translations } = hintifiedWord

    if (translations && translations.length > 0) {
      const buttonComponent = renderText(word, true)

      return (
        <Tooltip
          withOverlay={true}
          overlayColor={'rgba(0,0,0,0.5)'}
          height={'auto'}
          pointerColor={'white'}
          backgroundColor={'white'}
          actionType='press'
          width={'20%'}
          popover={renderTranslations(translations)}
        >
          {buttonComponent}
        </Tooltip>
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
        ? renderText(sentence.raw, false)
        : sentence.hintified.map(renderHintifiedWord)}
    </GSHintedSentence>
  )
}

export default Phrase
