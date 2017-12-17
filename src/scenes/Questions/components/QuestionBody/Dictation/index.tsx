import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import I18n from '../../../../../i18n';
import TextArea from '../../../../../components/TextArea';
import { IAnswerProps } from '../../../index.types';

interface IProps extends IAnswerProps { }

export default class Dictation extends React.Component<IProps> {
  render () {
    return (
      <Container style={styles.container}>
        <TextArea
          placeholder={I18n.t(`questions.dictionation`)}
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
