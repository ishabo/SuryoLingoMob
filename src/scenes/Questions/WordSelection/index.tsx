import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
    Container,
    View,
    Text,
} from 'native-base';
import shortid from 'shortid';
import Colors from '../../../styles/colors';
import { shuffle, remove } from 'lodash';
import { IAnswerProps } from '../'
import { IQuestion } from '../../../services/skills/reducers';

const shadowColor = 'gray';

export interface IWord {
    id: string;
    word: string;
    selected: boolean;
    width?: number;
}

export interface IState {
    shuffledWords: IWord[];
    answer: IWord[];
}

export interface IProps extends IAnswerProps {
    studyPhrase: IQuestion["studyPhrase"]["text"];
    possibleAnswers: string[];
}

const ensureShuffeled = (words: string[]) => {
    const shuffledWords = shuffle(shuffle(words));
    if (shuffledWords === words) {
        return ensureShuffeled(words);
    } else {
        return shuffledWords;
    }
}

export default class WordSelection extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        const shuffledSentenceArray = ensureShuffeled(props.possibleAnswers);
        const shuffledWords = shuffledSentenceArray.map((word: string) =>
            ({
                id: shortid.generate(),
                word,
                selected: false,
            })
        );

        this.state = {
            shuffledWords,
            answer: [],
        }
    }

    componentDidMount () {

    }

    updateShuffledWords = (updatedRecord: IWord) => {
        const shuffledWords = this.state.shuffledWords;
        const newShuffledWords = shuffledWords.map((word: IWord) =>
            word.id !== updatedRecord.id
                ? word
                : updatedRecord
        )

        this.setState({ shuffledWords: newShuffledWords });
    }

    answerHasWord = (word: IWord) =>
        this.state.answer.find((_word: IWord) => _word.word === word.word);

    updateAnswers = (word: IWord, action: 'add' | 'remove', saveCallback: () => void) => {
        const { answer } = this.state;

        if (!this.answerHasWord(word) && action === 'add') {
            answer.push(word);
        }

        if (action === 'remove') {
            remove(answer, (_word: IWord) => _word.word === word.word)
        }

        this.setState({ answer }, () => {
            this.props.collectAnswer(this.mapAnswerToString())
            saveCallback();
        });
    }

    mapAnswerToString = () => {
        return this.state.answer.map((word: IWord) => word.word).join(' ')
    }

    addWordToAnswer = (word: IWord) => {
        this.updateAnswers(word, 'add', () => {
            this.updateShuffledWords({ ...word, selected: true });
        });
    }

    removeWordFromAnswer = (word: IWord) => {
        this.updateAnswers(word, 'remove', () => {
            this.updateShuffledWords({ ...word, selected: false });
        });
    }

    renderAnswerWords = () => {

        return this.state.answer.map((word: IWord, _: number) => {
            return <View
                key={`answer_${word.id}`}
                style={styles.wordBox}
            >
                {this.renderWord(word)}
            </View>

        });
    }

    renderShuffledWords = () => {

        return this.state.shuffledWords.map((word: IWord, _: number) => {
            return <View
                key={`shuffle_${word.id}`}
                style={[styles.wordBox, {
                    backgroundColor: shadowColor,
                }]}
            >
                {word.selected
                    ? <Text style={{ color: shadowColor, padding: 10 }}>{word.word}</Text>
                    : this.renderWord(word)
                }
            </View>

        });
    }

    renderWord = (word: IWord) => {
        const handleWord = (word: IWord) => this.answerHasWord(word)
            ? this.removeWordFromAnswer(word)
            : this.addWordToAnswer(word)

        return word &&
            <TouchableOpacity onPress={() => handleWord(word)}>
                <Text style={{ alignSelf: 'stretch', backgroundColor: 'white', padding: 10 }}>{word.word}</Text>
            </TouchableOpacity>
    }

    render () {
        return (
            <Container >
                <View style={styles.answerBox} >
                    {this.renderAnswerWords()}
                </View>

                <View style={styles.selectionBox}>
                    {this.renderShuffledWords()}
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    wordBox: {
        height: 40,
        marginRight: 10,
        marginBottom: 10,
    },
    selectionBox: {
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 150,
        width: 320,
    },
    answerBox: {
        padding: 10,
        height: 150,
        width: 320,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: Colors.lightGray,
        marginVertical: 40,
        alignContent: 'flex-start',
        alignSelf: 'flex-start'
    }
});