import * as React from 'react'
import { View } from 'react-native'
import shortid from 'shortid'
import { KeyboardRegistry } from 'react-native-keyboard-input'

import { IKeyboardActions } from '@sl/components/Keyboards'
import {
  GSBackSpaceKey,
  GSContainer,
  GSContent,
  GSKey,
  GSIcon,
  GSKeyText,
  GSSpaceKey,
} from './index.styles'

interface IProps {
  layoutName: string
  letters: string[][]
  lang: TLangs
  wide?: boolean
  renderContent?: () => React.ReactElement<any>
}

const KeyboardLayout: React.FC<IProps> = ({ lang, layoutName, letters }) => {
  const onKeyPress = (value: string) => {
    onItemSelected({
      value,
      action: 'addChar',
    })
  }

  const onPress = (pressFunction: () => void) => () => {
    pressFunction()
  }

  const listKeys = (
    keys: string[],
    style: { fontSize: number; paddingTop?: number } = {
      fontSize: 14,
      paddingTop: -23,
    },
  ) =>
    keys &&
    keys.map((key: string) => (
      <GSKey
        key={shortid.generate()}
        onPress={onPress(() => {
          onKeyPress(key)
        })}
      >
        <GSKeyText lang={lang} style={{ ...style }}>
          {key}
        </GSKeyText>
      </GSKey>
    ))

  const onBackSpacePress = () => {
    onItemSelected({
      value: null,
      action: 'removeChar',
    })
  }

  const onItemSelected = (params: IKeyboardActions) => {
    KeyboardRegistry.onItemSelected(layoutName, params)
  }

  const listRows = (letters: string[][]) =>
    letters.map((row: string[]) => (
      <GSContent key={shortid.generate()}>{listKeys(row)}</GSContent>
    ))

  return (
    <GSContainer>
      <>{listRows(letters)}</>
      <GSContent>
        <GSBackSpaceKey onPress={onPress(onBackSpacePress)}>
          <GSIcon name='backspace' />
        </GSBackSpaceKey>
        <GSSpaceKey onPress={onPress(() => onKeyPress(' '))}>
          <View />
        </GSSpaceKey>
      </GSContent>
    </GSContainer>
  )
}

export default KeyboardLayout
