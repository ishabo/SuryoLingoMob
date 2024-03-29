import { ICustomText, GSCustomStudyText } from '@sl/styles/text'
import glamor from 'glamorous-native'
import Colors from '@sl/styles/colors'
import { StyleProp, TextStyle } from 'react-native'
import { scaleSize } from '@sl/helpers'

export const GSHints = glamor.view({
  flex: 1,
  backgroundColor: Colors.lightBlack,
  paddingVertical: 5,
  justifyContent: 'center',
  borderRadius: 5,
  width: 150,
  height: 200,
})
GSHints.displayName = 'GSHints'

export const GSHintBlock = glamor.view<{ last: boolean }>(
  {
    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderColor: Colors.lightBlack,
  },
  props =>
    !props.last
      ? {
          borderBottomColor: Colors.lightGray,
        }
      : null,
)

export const GSHintText = glamor.text({
  color: Colors.white,
  textAlign: 'center',
  alignSelf: 'stretch',
})
GSHintText.displayName = 'GSHintText'

export const GSHintedSentence = glamor.view({
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginBottom: 10,
  marginLeft: 10,
  marginTop: 0,
})
GSHintedSentence.displayName = 'GSHintedSentence'

interface IGSSentence extends ICustomText {
  hasTooltip: boolean
  style: StyleProp<TextStyle>
}

export const GSSentence = glamor(GSCustomStudyText)<IGSSentence>(
  {
    paddingVertical: 3,
    flexWrap: 'wrap',
  },
  props => {
    let style = {}

    style = props.hasTooltip
      ? ({
          color: Colors.darkBlue,
          fontSize:
            props.lang === 'cl-ara' ? scaleSize(24, 20) : scaleSize(20, 14),
          ...style,
        } as any)
      : style

    return style
  },
)
GSSentence.displayName = 'GSSentence'
