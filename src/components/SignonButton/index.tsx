import React from 'react';
import { NextButton } from 'components';
import I18n from 'I18n';
import Colors from 'styles/colors';
import { GSCustomText } from 'styles/text';
import glamor from 'glamorous-native';

interface IProps {
  simple?: boolean;
  learnersLanguage: TLangs;
  onPress (): void;
}

export default ({ learnersLanguage, simple, onPress }: IProps) => {

  return simple &&
    <GSSignIn onPress={onPress} lang={learnersLanguage} >
      {I18n.t('profile.form.signonToSave')}
    </GSSignIn> ||
    <NextButton onPress={onPress}
      disabled={false}
      text={I18n.t('profile.form.signonToSave')}
      restProps={{ primary: true, wide: true }}
      lang={learnersLanguage}
    />
};

const GSSignIn: any = glamor(GSCustomText)({
  fontSize: 14,
  marginHorizontal: 10,
  fontWeight: '600',
  color: Colors.darkBlue,
});

