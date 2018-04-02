import * as React from 'react';
import I18n from 'I18n';
import { GSCustomText } from 'styles/text';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';

interface IProps {
  onPress: () => void;
  learnersLanguage: TLangs;
}

export default ({ learnersLanguage, onPress }: IProps) =>
  <GSSignout onPress={onPress} lang={learnersLanguage} >
    {I18n.t('profile.form.signOut')}
  </GSSignout>;

const GSSignout: any = glamor(GSCustomText)({
  fontSize: 14,
  marginHorizontal: 10,
  fontWeight: '600',
  color: Colors.darkBlue,
});
