import glamor from 'glamorous-native';
import { getFont } from 'assets/fonts';
import { Platform } from 'react-native';
import colors from 'styles/colors';

interface ICustomText {
  lang?: TLangs;
  fontType?: 'bold' | 'regular';
}

export const GSCustomText = glamor.text<ICustomText>(
  {
    fontSize: 18,
  },
  ({ lang, fontType }) => ({
    fontFamily: Platform.OS === 'ios' ? 'FontAwesome' : getFont(lang || 'cl-ara', fontType),
  }),
);

export const GSTitle = glamor(GSCustomText)({
  padding: 10,
  fontSize: 30,
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
