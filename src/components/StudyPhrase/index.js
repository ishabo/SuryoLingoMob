import * as React from 'react';
import Phrase from 'components/Phrase';
import { SoundButton } from 'components';
import glamor from 'glamorous-native';
import { getWindowWidth, openPhraseInAdmin } from 'helpers';
import I18n from 'I18n';
import { TouchableOpacity, Text } from 'react-native';
export default (props) => {
    const { showSentence, sentence, sound, lang, centralize, isAdmin } = props;
    const renderEditLink = () => isAdmin && (React.createElement(TouchableOpacity, { onPress: () => openPhraseInAdmin(sentence.raw) },
        React.createElement(Text, null, I18n.t('questions.correction'))));
    const renderSound = () => (React.createElement(SoundButton, Object.assign({ key: 'soundTrack', disabled: sound === null }, sound, { size: centralize ? { large: true } : { small: true } })));
    const renderPhrase = () => (React.createElement(React.Fragment, null,
        React.createElement(Phrase, { key: lang + 'phrase', obscureText: !showSentence, sentence: sentence, lang: lang }),
        renderEditLink()));
    const content = [];
    sound && content.push(renderSound());
    centralize || content.push(renderPhrase());
    return React.createElement(GSContainer, { centralize: centralize }, content);
};
const GSContainer = glamor.view({
    flexDirection: 'row',
    marginHorizontal: 5,
    marginBottom: 10,
    justifyContent: 'space-between',
    maxWidth: getWindowWidth() - 50
}, props => {
    return {
        marginTop: props.centralize ? 20 : 0,
        justifyContent: props.centralize ? 'center' : 'flex-start',
        alignSelf: props.centralize ? 'center' : 'flex-start'
    };
});
//# sourceMappingURL=index.js.map