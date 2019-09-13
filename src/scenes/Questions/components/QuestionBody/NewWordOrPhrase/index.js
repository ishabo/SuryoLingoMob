import * as React from 'react';
import { scaleSize } from 'helpers';
import Phrase from 'components/Phrase';
import { GSContainer, GSMeaning, GSPhrase } from './index.styles';
export default class NewWordOrPhrase extends React.Component {
    render() {
        const { sentence, translation, course, lang: targetLang } = this.props;
        const sourceLang = course.sourceLanguage.shortName;
        return (React.createElement(GSContainer, null,
            React.createElement(Phrase, { lang: targetLang, sentence: sentence, style: { fontSize: scaleSize(28, 22) } }),
            React.createElement(GSMeaning, null),
            React.createElement(GSPhrase, { lang: sourceLang }, translation)));
    }
}
//# sourceMappingURL=index.js.map