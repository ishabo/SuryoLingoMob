import * as React from 'react';
import { Container } from 'native-base';
import { TextArea } from 'components';
import { IAnswerProps } from '../../../index.types';
import I18n from 'I18n';
import { ICourse } from 'services/courses';
import glamor from 'glamorous-native';

interface IProps extends IAnswerProps {
  reverse: boolean;
  course: ICourse;
}

export default class Dictation extends React.Component<IProps> {
  render() {
    return (
      <GSContainer>
        <TextArea
          placeholder={I18n.t(`questions.dictation`)}
          captureInput={this.props.collectAnswer}
          showCustomKeyboard={this.props.reverse && !this.props.userHasAnswered}
          inputLanguage={this.props.course.targetLanguage.shortName}
          onSubmit={this.props.onSubmit}
        />
      </GSContainer>
    );
  }
}

export const GSContainer = glamor(Container)({
  alignSelf: 'stretch'
});
