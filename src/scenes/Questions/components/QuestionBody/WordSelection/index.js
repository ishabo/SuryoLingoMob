import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import { GSAnswerBox, GSSelectionBox, GSWordBox, GSWordText, GSTitle } from './index.styles';
import { shuffle, remove } from 'lodash';
import shortid from 'shortid';
import I18n from 'I18n';
const ensureShuffeled = (words) => {
    const shuffledWords = shuffle(shuffle(words));
    if (shuffledWords === words) {
        return ensureShuffeled(words);
    }
    else {
        return shuffledWords;
    }
};
export default class WordSelection extends React.Component {
    constructor(props) {
        super(props);
        this.determineAnswerWords = () => {
            const { reverse, phrase, translation, incorrectChoices } = this.props;
            return (reverse ? phrase : translation).split(' ').concat(incorrectChoices);
        };
        this.getSuffledWords = () => {
            const wordsToShuffle = this.determineAnswerWords();
            return ensureShuffeled(wordsToShuffle).map((word) => ({
                word,
                id: shortid.generate(),
                selected: false
            }));
        };
        this.updateShuffledWords = (updatedRecord) => {
            const shuffledWords = this.state.shuffledWords;
            const newShuffledWords = shuffledWords.map((word) => (word.id !== updatedRecord.id ? word : updatedRecord));
            this.setState({ shuffledWords: newShuffledWords });
        };
        this.answerHasWord = (word) => this.state.answer.find((w) => w.id === word.id);
        this.updateAnswers = (word, action, saveCallback) => {
            const { answer } = this.state;
            if (!this.answerHasWord(word) && action === 'add') {
                answer.push(word);
            }
            if (this.answerHasWord(word) && action === 'remove') {
                remove(answer, (w) => w.id === word.id);
            }
            this.setState({ answer }, () => {
                this.props.collectAnswer(this.mapAnswerToString());
                saveCallback();
            });
        };
        this.getWordTextLang = () => {
            const { reverse, course } = this.props;
            return reverse ? course.targetLanguage.shortName : course.sourceLanguage.shortName;
        };
        this.mapAnswerToString = () => {
            return this.state.answer.map((word) => word.word).join(' ');
        };
        this.addWordToAnswer = (word) => {
            this.updateAnswers(word, 'add', () => {
                this.updateShuffledWords(Object.assign({}, word, { selected: true }));
            });
        };
        this.removeWordFromAnswer = (word) => {
            this.updateAnswers(word, 'remove', () => {
                this.updateShuffledWords(Object.assign({}, word, { selected: false }));
            });
        };
        this.renderAnswerWords = () => this.state.answer.map((word, _) => (React.createElement(GSWordBox, { key: word.id }, this.renderWord(word, true))));
        this.renderShuffledWords = () => this.state.shuffledWords.map((word, _) => (React.createElement(GSWordBox, { key: word.id }, word.selected ? (React.createElement(GSWordText, { lang: this.getWordTextLang(), shadowed: true }, word.word)) : (this.renderWord(word)))));
        this.renderWord = (word, selected = false) => {
            const handleWord = (word) => this.answerHasWord(word) ? this.removeWordFromAnswer(word) : this.addWordToAnswer(word);
            return (word && (React.createElement(TouchableOpacity, { onPress: () => handleWord(word) },
                React.createElement(GSWordText, { lang: this.getWordTextLang(), selected: selected }, word.word))));
        };
        const shuffledWords = this.getSuffledWords();
        this.state = {
            shuffledWords,
            answer: []
        };
    }
    render() {
        return (React.createElement(Container, null,
            React.createElement(GSAnswerBox, null, this.renderAnswerWords()),
            React.createElement(GSTitle, null, I18n.t('questions.wordSelection')),
            React.createElement(GSSelectionBox, null, this.renderShuffledWords())));
    }
}
//# sourceMappingURL=index.js.map