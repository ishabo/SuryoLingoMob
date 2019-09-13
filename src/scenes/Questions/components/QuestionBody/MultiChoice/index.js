import * as React from 'react';
import I18n from 'I18n';
import shortid from 'shortid';
import { TouchableOpacity, ScrollView } from 'react-native';
import { GSChoice, GSContainer, GSContent, GSRadio, GSText, GSTitle } from './index.styles';
import { shuffle } from 'lodash';
export default class MultiChoice extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            answer: [],
            choices: []
        };
        this.updateAnswers = (choice) => {
            const { answer } = this.state;
            const index = answer.indexOf(choice);
            if (index >= 0) {
                answer.splice(index, 1);
            }
            else {
                answer.push(choice);
            }
            this.setState({ answer }, () => {
                this.props.collectAnswer(answer);
            });
        };
        this.getWordTextLang = () => {
            const { reverse, course } = this.props;
            return reverse ? course.targetLanguage.shortName : course.sourceLanguage.shortName;
        };
        this.isChoiceSelected = (choice) => {
            const index = this.state.answer.indexOf(choice);
            return index >= 0;
        };
        this.renderChoices = () => this.state.choices.map((choice) => (React.createElement(TouchableOpacity, { key: shortid.generate(), onPress: () => this.updateAnswers(choice) },
            React.createElement(GSChoice, { checked: this.isChoiceSelected(choice) },
                React.createElement(GSRadio, { checked: this.isChoiceSelected(choice) }),
                React.createElement(GSText, { lang: this.getWordTextLang() }, choice)))));
    }
    componentDidMount() {
        const { reverse, phrase, translation, incorrectChoices, otherCorrectAnswers } = this.props;
        const correctChoice = reverse ? phrase : translation;
        const correctChoices = otherCorrectAnswers && Array.isArray(otherCorrectAnswers)
            ? [...otherCorrectAnswers, correctChoice]
            : [correctChoice];
        this.setState({
            choices: shuffle(correctChoices.concat(incorrectChoices))
        });
    }
    render() {
        return (React.createElement(ScrollView, { contentContainerStyle: { paddingBottom: 80, flex: 1 } },
            React.createElement(GSContainer, null,
                React.createElement(GSContent, null,
                    React.createElement(GSTitle, null, I18n.t('questions.multiChoice')),
                    this.renderChoices()))));
    }
}
//# sourceMappingURL=index.js.map