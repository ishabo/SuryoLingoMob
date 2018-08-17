import glamor from 'glamorous-native';
import { getFont } from 'assets/fonts';
import colors from 'styles/colors';
import { scaleSize } from 'helpers';
import { Platform } from 'react-native';

export interface ICustomText {
  lang?: TLangs;
  fontType?: 'bold' | 'regular';
}

export const GSCustomText = glamor.text<ICustomText>({}, ({ lang }) => ({
  fontFamily: getFont(lang ? lang : 'cl-ara', 'bold'),
  fontSize: lang === 'cl-ara' && Platform.OS === 'android' ? scaleSize(20, 16) : scaleSize(16, 12)
}));

export const GSTitle = glamor(GSCustomText)({
  padding: 10,
  fontSize: 24,
  textAlign: 'center'
});

export const GSAlert = glamor(GSCustomText)<{ success: boolean }>(
  {
    padding: 10,
    fontSize: 25
  },
  ({ success }) => ({
    color: success ? colors.green : colors.red
  })
);
