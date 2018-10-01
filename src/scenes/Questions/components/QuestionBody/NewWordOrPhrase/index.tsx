import * as React from 'react';
import { Container } from 'native-base';
import { IAnswerProps } from '../../../index.types';
import glamor from 'glamorous-native';
import { GSCustomText, ICustomText } from 'styles/text';
import { ICourse } from 'services/courses';
import Phrase, { IProps as IPhraseProps } from 'components/Phrase';
import { scaleSize, getWindowWidth } from 'helpers';

interface IProps extends IAnswerProps, IPhraseProps {
  translation: string;
  phrase: string;
  course: ICourse;
}

export default class NewWordOrPhrase extends React.Component<IProps> {
  render() {
    const { sentence, translation, course, lang: targetLang } = this.props;
    const sourceLang = course.sourceLanguage.shortName as TLangs;
    return (
      <GSContainer>
        <Phrase lang={targetLang} sentence={sentence} style={{ fontSize: scaleSize(28, 22) }} />
        <GSMeaning />
        <GSPhrase lang={sourceLang}>{translation}</GSPhrase>
      </GSContainer>
    );
  }
}

export const GSContainer = glamor(Container)({
  paddingVertical: 50,
  alignItems: 'center'
});

export const GSMeaning = glamor.view({
  marginVertical: 30,
  borderBottomWidth: 1,
  width: getWindowWidth() - 100,
  borderColor: 'gray'
});

export const GSPhrase = glamor(GSCustomText)<ICustomText>({
  textAlign: 'center',
  fontSize: scaleSize(26, 20),
  flexWrap: 'wrap',
  alignSelf: 'center'
});
