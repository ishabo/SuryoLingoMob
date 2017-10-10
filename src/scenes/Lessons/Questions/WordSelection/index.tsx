import React from 'react';
import { StyleSheet, Animated, TouchableOpacity, UIManager } from 'react-native';
import {
    Container,
    View,
    Text,
} from 'native-base';
import shortid from 'shortid';
import Colors from '../../../../styles/colors';
import { shuffle, remove } from 'lodash';

const distanceBetweenWords = 10;

export interface IWord {
    id: string;
    word: string;
    position: 'relative' | 'absolute';
    defaultXY: Animated.ValueXY;
    newXY?: Animated.ValueXY;
    oldXY?: Animated.ValueXY;
    width?: number;
    addedPosition: number;
}

export interface IState {
    shuffledWords: IWord[];
    answer: IWord[];
}

export interface IProps {
    sentence: string;
}

const ensureShuffeled = (words: string[]) => {
    const shuffledWords = shuffle(shuffle(words));
    if (shuffledWords === words) {
        return ensureShuffeled(words);
    } else {
        return shuffledWords;
    }
}

const AnimatedView = Animated.createAnimatedComponent(View);

export default class WordSelection extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        const shuffledSentenceArray = ensureShuffeled(props.sentence.split(' '));
        const shuffledWords = shuffledSentenceArray.map((word: string) =>
            ({ id: shortid.generate(), word, position: 'relative', defaultXY: new Animated.ValueXY({ x: 0, y: 0 }) })
        );

        this.state = {
            shuffledWords,
            answer: [],
        }
    }

    componentDidMount () {
        UIManager.measure(1, (frameX, frameY, frameWidth, frameHeight, pageX, pageY) => {
            // do something with the measured values
            alert([frameX, frameY, frameWidth, frameHeight, pageX, pageY])
        });
    }

    updateShuffledWords = (updatedRecord: IWord) => {
        const shuffledWords = this.state.shuffledWords;
        const newShuffledWords = shuffledWords.map((word: IWord) =>
            word.id !== updatedRecord.id
                ? word
                : updatedRecord
        )
        // return newShuffledWords
        this.setState({ shuffledWords: newShuffledWords });
    }

    answerHasWord = (word: IWord) => this.state.answer.find((_word: IWord) => _word.word === word.word);

    updateAnswers = (word: IWord, action: 'add' | 'remove', saveCallback: () => void) => {
        const { answer } = this.state;

        if (!this.answerHasWord(word) && action === 'add') {
            answer.push(word);
        }

        if (action === 'remove') {
            remove(answer, (_word: IWord) => _word.word === word.word)
        }

        this.setState({ answer }, saveCallback);
    }

    // onWordLayout = (event: any, word: IWord) => {
    //     word.width = event.nativeEvent.layout.width;
    //     const xPosition = this.getAnswersXPosition(this.state.shuffledWords, word);
    //     word.position = new Animated.ValueXY({
    //         x: xPosition,
    //         y: 0
    //     });
    //     this.updateShuffledWords(word);
    // }

    getAnswersXPosition = (Obj: IWord[], word: IWord) => {
        let xPosition: number = 0;

        for (let w of Obj) {
            if (word.word === w.word) {
                break;
            }
            xPosition += (w.width + distanceBetweenWords)
        }

        return xPosition;
    }

    moveToBox = (e: any, word: IWord) => {
        alert(e.nativeEvent.pageX)
        this.updateAnswers(word, 'add', () => {
            this.updateShuffledWords({ ...word, position: 'absolute' })
            Animated.timing(word.defaultXY, {
                toValue: {
                    y: -170,
                    x: 0
                },
                duration: 200
            }).start();
        });
    }

    removeFromBox = (e: any, word: IWord) => {
        alert(e.nativeEvent.pageX)
        this.updateAnswers(word, 'remove', () => {
            this.updateShuffledWords({ ...word, position: 'absolute' })
            Animated.timing(word.defaultXY, {
                toValue: {
                    y: 0,
                    x: 0,
                },
                duration: 200
            }).start();
        });
    }

    renderShadowSentence = () => {
        const shadowColor = 'gray';

        return this.state.shuffledWords.map((word: IWord) => {
            return <View
                key={word.id}
                style={[styles.wordBox, {
                    backgroundColor: shadowColor
                }]}
            >
                {this.renderWord(word)}
            </View>

        });
    }

    renderWord = (word: IWord) => {
        return word && <AnimatedView
            style={[styles.wordBox, {
                backgroundColor: 'white',
                padding: 10,
                left: word.defaultXY.x,
                top: word.defaultXY.y
            }]}
            key={word.id}
        >
            <TouchableOpacity onPress={(e: any) =>
                this.answerHasWord(word) && this.removeFromBox(e, word) || this.moveToBox(e, word)}>
                <Text>{word.word}</Text>
            </TouchableOpacity>
        </AnimatedView>
    }

    render () {
        return (
            <Container style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <View ref='answer' style={styles.answerBox} />

                {this.renderShadowSentence()}

                <View style={{ backgroundColor: 'red', height: 20, width: 20, position: 'absolute', top: 0, left: 0 }} />

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    animatedBox: {
        zIndex: 1000,
        backgroundColor: 'transparent',
        flexWrap: 'wrap',
    },
    wordBox: {
        height: 40,
        marginRight: distanceBetweenWords,
        marginBottom: 10
    },
    selectionBox: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        left: 0,
        position: 'absolute',
        top: 220,
        width: 300
    },
    answerBox: {
        height: 150,
        width: 320,
        backgroundColor: Colors.lightGray,
        marginVertical: 40,
        alignContent: 'flex-start',
        alignSelf: 'flex-start'
    }
});