import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import I18n from '../../../i18n';
import TextArea from '../../../components/TextArea';

import { IAnswerProps } from '../'

interface IProps extends IAnswerProps {
    targetLang: IQuestion["targetLang"]
}

export default class Translation extends React.Component<IProps> {

    render () {
        const placeholder = I18n.t(`questions.translateTo.${this.props.targetLang}`)
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
        writingDirection: 'rtl'
    }
});