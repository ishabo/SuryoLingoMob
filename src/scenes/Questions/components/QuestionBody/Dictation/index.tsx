import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { TextArea } from 'components';
import { IAnswerProps } from '../../../index.types';
import I18n from 'I18n';
import { ICourse } from 'services/courses';

interface IProps extends IAnswerProps {
  reverse: boolean;
  course: ICourse;
}

export default class Dictation extends React.Component<IProps> {
  render () {
    return (
      <Container style={styles.container}>
        <TextArea
          placeholder={I18n.t(`questions.dictionation`)}
          captureInput={this.props.collectAnswer}
          showCustomKeyboard={this.props.reverse && !this.props.userHasAnswered}
          targetLanguage={this.props.course.targetLanguage.shortName}
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
