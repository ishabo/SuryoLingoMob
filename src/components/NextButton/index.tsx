import * as React from 'react'
import { Button, View } from 'native-base'
import glamor from 'glamorous-native'
import { calcWindowWidth } from '@sl/helpers'
import { GSCustomText, ICustomText } from '@sl/styles/text'
import Colors from '@sl/styles/colors'

interface IProps {
  disabled?: boolean
  restProps?: any
  onPress: () => void
  text: string
  lang: TLangs
}

export default ({
  disabled = false,
  onPress,
  text,
  lang,
  restProps = { success: true, wide: true },
}: IProps) => (
  <View style={{ height: 50 }}>
    <GSButton
      {...restProps}
      rounded
      block
      onPressIn={onPress}
      disabled={disabled}
    >
      <GSButtonText lang={lang} light={restProps.light}>
        {text}
      </GSButtonText>
    </GSButton>
  </View>
)

const GSButton = glamor(Button)<{ wide?: boolean; narrow?: boolean }>(
  {
    alignSelf: 'stretch',
  },
  ({ wide, narrow }) => {
    let width
    let alignSelf
    if (wide) {
      width = calcWindowWidth(10)
      alignSelf = 'center'
    } else if (narrow) {
      width = 120
    }
    return { width, alignSelf }
  },
)

interface IButtonText extends ICustomText {
  light: boolean
}

const GSButtonText = glamor(GSCustomText)<IButtonText>(
  {
    alignSelf: 'center',
  },
  (props) => ({
    color: props.light ? Colors.lightBlack : Colors.white,
  }),
)
