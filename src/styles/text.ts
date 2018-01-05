import glamor from 'glamorous-native';
import { getFont } from 'assets/fonts';
import { Platform } from 'react-native';

interface ICustomText {
  lang: TLangs;
  fontType?: 'bold' | 'regular';
}

export const CustomText = glamor.text<ICustomText>(
  {
    fontSize: 16,
  },
  ({ lang, fontType }) => ({
    fontFamily: Platform.OS === 'ios' ? 'FontAwesome' : getFont(lang, fontType),
  }),
);
