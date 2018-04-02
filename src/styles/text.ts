import glamor from 'glamorous-native';
import { getFont } from 'assets/fonts';
import colors from 'styles/colors';
import { scaleSize } from 'helpers';

interface ICustomText {
  lang?: TLangs;
  fontType?: 'bold' | 'regular';
}

export const GSCustomText: any = glamor.text<ICustomText>(
  {},
  ({ lang, fontType }) => ({
    fontFamily: getFont(lang ? lang : 'cl-ara', fontType),
    fontSize: lang === 'cl-ara' ? scaleSize(20, 16) : scaleSize(18, 14),
  }),
);

export const GSTitle: any = glamor(GSCustomText)({
  padding: 10,
  fontSize: 24,
  textAlign: 'center',
});

export const GSAlert: any = glamor(GSCustomText)<{ success: boolean }>(
  {
    padding: 10,
    fontSize: 25,
  },
  ({ success }) => ({
    color: success ? colors.green : colors.red,
  }),
);
