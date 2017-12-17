import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import I18n from '../../../../../i18n';
import TextArea from '../../../../../components/TextArea';
import { ICourse } from '../../../../../services/courses/reducers';
import { IAnswerProps } from '../../../index.types';

interface IProps extends IAnswerProps {
  course: ICourse;
  reverse: boolean;
}

export default class Translation extends React.Component<IProps> {
  render () {
    const { course } = this.props;
    const translateTo: string = this.props.reverse ? 'targetLanguage' : 'learnersLanguage';
    const placeholder = I18n.t(`questions.translateTo.${course[translateTo].shortName}`);
    return (
      <Container style={styles.container}>
        <TextArea
          placeholder={placeholder}
          captureInput={this.props.collectAnswer}
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
