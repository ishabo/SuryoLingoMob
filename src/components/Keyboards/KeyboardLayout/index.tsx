import * as React from 'react'

import { View } from 'react-native'
import shortid from 'shortid'
import {
  GSBackSpaceKey,
  GSContainer,
  GSContent,
  GSKey,
  GSIcon,
  GSKeyText,
  GSSpaceKey,
} from './index.styles'
import { KeyboardRegistry } from 'react-native-keyboard-input'
import { IKeyboardActions } from '@sl/components/Keyboards'

interface IProps {
  layoutName: string
  letters: string[][]
  lang: TLangs
  wide?: boolean
  renderContent?: () => React.ReactElement<any>
}

class KeyboardLayout extends React.Component<IProps> {
  private listKeys = (
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
        onPress={this.onPress(() => {
          this.onKeyPress(key)
        })}
      >
        <GSKeyText lang={this.props.lang} style={{ ...style }}>
          {key}
        </GSKeyText>
      </GSKey>
    ))

  private onPress = (pressFunction: () => void) => () => {
    pressFunction()
  }

  private onKeyPress = (value: string) => {
    this.onItemSelected({
      value,
      action: 'addChar',
    })
  }

  private onBackSpacePress = () => {
    this.onItemSelected({
      value: null,
      action: 'removeChar',
    })
  }

  private onItemSelected = (params: IKeyboardActions) => {
    KeyboardRegistry.onItemSelected(this.props.layoutName, params)
  }

  private listRows = (letters: string[][]) =>
    letters.map((row: string[]) => (
      <GSContent key={shortid.generate()}>{this.listKeys(row)}</GSContent>
    ))

  render() {
    return (
      <GSContainer>
        <>{this.listRows(this.props.letters)}</>
        <GSContent>
          <GSBackSpaceKey onPress={this.onPress(this.onBackSpacePress)}>
            <GSIcon name='backspace' />
          </GSBackSpaceKey>
          <GSSpaceKey onPress={this.onPress(() => this.onKeyPress(' '))}>
            <View />
          </GSSpaceKey>
        </GSContent>
      </GSContainer>
    )
  }
}

export default KeyboardLayout
