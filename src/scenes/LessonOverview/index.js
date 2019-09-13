import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getPhrases } from 'services/selectors';
import { StudyPhrase } from 'components';
import shortid from 'shortid';
import { Analytics } from 'config/firebase';
import { GSContainer, GSOverview, GSPhrase, GSTranslation } from './index.styles';
class LessonOverview extends React.Component {
    componentDidMount() {
        Analytics.setCurrentScreen(this.constructor.name);
    }
    render() {
        return (React.createElement(GSContainer, null,
            React.createElement(ScrollView, { style: { flexDirection: 'column' } }, this.props.phrases.map((phrase) => (React.createElement(GSOverview, { key: shortid.generate() },
                React.createElement(GSPhrase, null,
                    React.createElement(StudyPhrase, { isAdmin: this.props.isAdmin, showSentence: true, sound: { soundTrack: phrase.sound }, sentence: phrase.sentence, lang: "cl-syr" })),
                React.createElement(GSTranslation, null, phrase.translation)))))));
    }
}
const mapStateToProps = (state) => ({
    phrases: getPhrases(state),
    isAdmin: state.profile.isTester
});
export default connect(mapStateToProps, null)(LessonOverview);
//# sourceMappingURL=index.js.map