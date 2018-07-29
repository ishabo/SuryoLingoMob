import * as React from 'react';
import { Container } from 'native-base';
import { IAnswerProps } from '../../../index.types';
import I18n from 'I18n';
import glamor from 'glamorous-native';
import { GSCustomText, ICustomText } from 'styles/text';
import { ICourse } from 'services/courses';
import Phrase, { IProps as IPhraseProps } from 'components/Phrase';
import { scaleSize } from 'helpers';

interface IProps extends IAnswerProps, IPhraseProps {
  translation: string;
  phrase: string;
  course: ICourse;
}

export default class NewWordOrPhrase extends React.Component<IProps> {
  render() {
    const { sentence, translation, course, lang: targetLang } = this.props;
    // const targetLang = course.targetLanguage.shortName as TLangs;
    const sourceLang = course.sourceLanguage.shortName as TLangs;
    return (
      <GSContainer>
        <Phrase lang={targetLang} sentence={sentence} style={{ fontSize: scaleSize(28, 22) }} />
        <GSMeaning lang={sourceLang}>{I18n.t(`questions.phraseMeaning`)}</GSMeaning>
        <GSPhrase lang={sourceLang}>{translation}</GSPhrase>
      </GSContainer>
    );
  }
}

export const GSContainer = glamor(Container)({
  paddingVertical: 50,
  alignItems: 'center'
});

export const GSMeaning = glamor(GSCustomText)<ICustomText>({
  marginVertical: 30
});

export const GSPhrase = glamor(GSCustomText)<ICustomText>({
  textAlign: 'center',
  fontSize: scaleSize(28, 22),
  flexWrap: 'wrap'
});
