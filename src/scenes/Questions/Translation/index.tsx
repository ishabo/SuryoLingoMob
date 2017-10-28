import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import I18n from '../../../i18n';
import TextArea from '../../../components/TextArea';
import { IQuestion } from '../../../services/modules/reducers';
import { ICourse } from '../../../services/courses/reducers';

import { IAnswerProps } from '../'

interface IProps extends IAnswerProps {
    translateTo: IQuestion["translateTo"];
    course: ICourse;
}

export default class Translation extends React.Component<IProps> {

    render () {
        const { course, translateTo } = this.props;
        const placeholder = I18n.t(`questions.translateTo.${course[translateTo]}`)
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
    }
});