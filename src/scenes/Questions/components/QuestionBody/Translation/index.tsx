import React from 'react';
import { Container } from 'native-base';
import I18n from 'I18n';
import { TextArea } from 'components';
import { ICourse } from 'services/courses';
import { IAnswerProps } from '../../../index.types';
import glamor from 'glamorous-native';

interface IProps extends IAnswerProps {
  course: ICourse;
  reverse: boolean;
}

export default class Translation extends React.Component<IProps> {
  render () {
    const { course, userHasAnswered, reverse, collectAnswer } = this.props;
    const translateTo: string = reverse ? 'targetLanguage' : 'learnersLanguage';
    const placeholder = I18n.t(`questions.translateTo.${course[translateTo].shortName}`);
    return (
      <GSContainer>
        <TextArea
          placeholder={placeholder}
          captureInput={collectAnswer}
          showCustomKeyboard={reverse && !userHasAnswered}
          inputLanguage={course[translateTo].shortName}
          autoFocus={!reverse}
        />
      </GSContainer>
    );
  }
}

const GSContainer = glamor(Container)({
  alignSelf: 'stretch',
});
