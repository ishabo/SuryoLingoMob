import React from 'react';
import { Container } from 'native-base';
import { IAnswerProps } from '../../../index.types';
import I18n from 'I18n';
import glamor from 'glamorous-native';
import { CustomText } from 'styles/text';
import { ICourse } from 'services/courses';
import Phrase, {
  IProps as IPhraseProps,
} from 'scenes/Questions/components/StudyPhrase/components/Phrase';

interface IProps extends IAnswerProps, IPhraseProps {
  translation: string;
  phrase: string;
  course: ICourse;
}

export default class NewWordOrPhrase extends React.Component<IProps> {

  render () {
    const { phrase, translation, course } = this.props;
    const targetLang = course.targetLanguage.shortName as TLangs;
    const learnersLang = course.learnersLanguage.shortName as TLangs;
    return (
      <GSContainer>
        <Phrase lang={targetLang} sentence={phrase} />
        <GSMeaning lang={learnersLang}>
          {I18n.t(`questions.phraseMeaning`)}
        </GSMeaning>
        <GSPhrase lang={learnersLang}>{translation}</GSPhrase>
      </GSContainer>
    );
  }
}

export const GSContainer = glamor(Container)({
  paddingVertical: 50,
});

export const GSMeaning = glamor(CustomText)({
  alignSelf: 'center',
  marginVertical: 30,
});

export const GSPhrase = glamor(CustomText)({
  alignSelf: 'center',
  textAlign: 'center',
  fontSize: 30,
});
