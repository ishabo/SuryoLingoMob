import { Container, Button } from 'native-base'
import glamor from 'glamorous-native'
import Colors from '@sl/styles/colors'
import { isShortDevice } from '@sl/helpers'
import { getFont } from '@sl/assets/fonts'

export const GSContainer = glamor(Container)({
  alignSelf: 'stretch',
})

export const GSContent = glamor.view({
  justifyContent: 'flex-start',
  flex: 1,
})

export const GSTextAreaContainer = glamor.view({
  height: isShortDevice() ? 80 : 80,
  marginBottom: 2,
  borderWidth: 1,
  borderColor: Colors.white,
  padding: 3,
  position: 'relative',
})

export const GSTextArea = glamor.textInput(
  {
    minHeight: 70,
    padding: 5,
    textAlign: 'right',
    backgroundColor: Colors.lightGray,
    textAlignVertical: 'top',
  },
  (props: any) => {
    const styles = {
      writingDirection: undefined,
      fontFamily:
        props.lang === 'cl-ara' ? 'Arial' : getFont(props.lang, 'regular'),
    }
    if (props.rtl !== null) {
      styles.writingDirection = 'rtl'
    }
    return styles
  },
) as any

export const GSKeyboardToolBar = glamor.view({
  justifyContent: 'flex-end',
  backgroundColor: 'white',
  padding: 4,
  flexDirection: 'row',
})

export const GSKeyboardCloseButton = glamor(Button)({
  width: 30,
  height: 34,
  margin: 2,
})

export const GSKeyboardToggleButton = glamor.touchableOpacity({
  flexDirection: 'row-reverse',
  zIndex: 1000,
  position: 'absolute',
  bottom: 0,
  right: 5,
})
