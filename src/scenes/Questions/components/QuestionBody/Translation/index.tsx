import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import I18n from '../../../../../i18n';
import TextArea from '../../TextArea';
import { ICourse } from '../../../../../services/courses/reducers';
import { IAnswerProps } from '../../../index.types';

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
      <Container style={styles.container}>
        <TextArea
          placeholder={placeholder}
          captureInput={collectAnswer}
          showSyriacKeyboard={reverse && !userHasAnswered}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});
