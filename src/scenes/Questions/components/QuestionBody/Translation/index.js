import * as React from 'react';
import { Container } from 'native-base';
import I18n from 'I18n';
import { TextArea } from 'components';
import glamor from 'glamorous-native';
export default class Translation extends React.Component {
    render() {
        const { course, userHasAnswered, reverse, collectAnswer } = this.props;
        const translateTo = reverse ? 'targetLanguage' : 'sourceLanguage';
        const placeholder = I18n.t(`questions.translateTo.${course[translateTo].shortName}`);
        return (React.createElement(GSContainer, null,
            React.createElement(TextArea, { disableKeyboard: userHasAnswered, placeholder: placeholder, captureInput: collectAnswer, showCustomKeyboard: reverse && !userHasAnswered, inputLanguage: course[translateTo].shortName, autoFocus: !reverse, onSubmit: this.props.onSubmit, renderNextButton: this.props.renderNextButton })));
    }
}
const GSContainer = glamor(Container)({
    alignSelf: 'stretch'
});
GSContainer.displayName = 'GSContainer';
//# sourceMappingURL=index.js.map