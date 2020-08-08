import glamor from 'glamorous-native'
import { getFont } from '@sl/assets/fonts'
import colors from '@sl/styles/colors'
import { scaleSize } from '@sl/helpers'
import { Platform } from 'react-native'

export interface ICustomText {
  lang?: TLangs
  fontType?: 'bold' | 'regular'
}

export const GSCustomText = glamor.text<ICustomText>({}, ({ lang }) => ({
  fontFamily: getFont(lang ? lang : 'cl-ara', 'bold'),
  fontSize:
    lang === 'cl-ara' && Platform.OS === 'android'
      ? scaleSize(20, 16)
      : scaleSize(18, 12),
}))
GSCustomText.displayName = 'GSCustomText'

export const GSCustomStudyText = glamor(GSCustomText)<ICustomText>(
  {},
  ({ lang }) => ({
    fontFamily: lang === 'cl-ara' ? 'Arial' : getFont(lang),
  }),
)
GSCustomStudyText.displayName = 'GSCustomStudyText'

export const GSTitle = glamor(GSCustomText)({
  padding: 10,
  fontSize: 24,
  textAlign: 'center',
})
GSTitle.displayName = 'GSTitle'

export const GSAlert = glamor(GSCustomText)<{ success: boolean }>(
  {
    padding: 10,
    fontSize: 25,
  },
  ({ success }) => ({
    color: success ? colors.green : colors.red,
  }),
)
GSAlert.displayName = 'GSAlert'
