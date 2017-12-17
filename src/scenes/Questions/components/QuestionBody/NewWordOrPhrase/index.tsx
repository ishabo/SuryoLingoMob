import React from 'react';
import { Container } from 'native-base';
import { IAnswerProps } from '../../../index.types';
import I18n from '../../../../../i18n';
import glamor from 'glamorous-native';

interface IProps extends IAnswerProps {
  translation: string;
  phrase: string;
}

export default class NewWordOrPhrase extends React.Component<IProps> {

  render () {
    const { phrase, translation } = this.props;
    return (
      <GSContainer>
        <GSPhrase>{phrase}</GSPhrase>
        <GSMeaning>
          {I18n.t(`questions.phraseMeaning`)}
        </GSMeaning>
        <GSPhrase>{translation}</GSPhrase>
      </GSContainer>
    );
  }
}

export const GSContainer = glamor(Container)({
  paddingVertical: 50,
});

export const GSMeaning = glamor.text({
  alignSelf: 'center',
  marginVertical: 30,
});

export const GSPhrase = glamor.text({
  alignSelf: 'center',
  fontSize: 30,
});
