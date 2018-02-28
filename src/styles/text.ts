import glamor from 'glamorous-native';
import { getFont } from 'assets/fonts';
import { Platform } from 'react-native';
import colors from 'styles/colors';
import { scaleSize } from 'helpers';

interface ICustomText {
  lang?: TLangs;
  fontType?: 'bold' | 'regular';
}

export const GSCustomText = glamor.text<ICustomText>(
  {},
  ({ lang, fontType }) => ({
    fontFamily: Platform.OS === 'ios' ? 'FontAwesome' : getFont(lang || 'cl-ara', fontType),
    fontSize: lang === 'cl-ara' ? scaleSize(20, 14) : scaleSize(18, 14),
  }),
);

export const GSTitle = glamor(GSCustomText)({
  padding: 10,
  fontSize: 24,
  textAlign: 'center',
});

export const GSAlert = glamor(GSCustomText)<{ success: boolean }>(
  {
    padding: 10,
    fontSize: 25,
  },
  ({ success }) => ({
    color: success ? colors.green : colors.red,
  }),
);
