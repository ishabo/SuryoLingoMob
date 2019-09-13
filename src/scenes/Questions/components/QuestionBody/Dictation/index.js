import * as React from 'react';
import { Container } from 'native-base';
import { TextArea } from 'components';
import I18n from 'I18n';
import glamor from 'glamorous-native';
export default class Dictation extends React.Component {
    render() {
        return (React.createElement(GSContainer, null,
            React.createElement(TextArea, { disableKeyboard: this.props.userHasAnswered, placeholder: I18n.t(`questions.dictation`), captureInput: this.props.collectAnswer, showCustomKeyboard: this.props.reverse && !this.props.userHasAnswered, inputLanguage: this.props.course.targetLanguage.shortName, onSubmit: this.props.onSubmit, renderNextButton: this.props.renderNextButton })));
    }
}
export const GSContainer = glamor(Container)({
    alignSelf: 'stretch'
});
GSContainer.displayName = 'GSContainer';
//# sourceMappingURL=index.js.map