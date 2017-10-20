import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Bar as ProgressBar } from 'react-native-progress';
import {
    Container,
    View,
    Icon,
    Body,
    Text,
    Button
} from 'native-base';

import Colors from '../../styles/colors';
import I18n from '../../i18n';
import MultiChoice from './MultiChoice';
import Translation from './Translation';
import Dictation from './Dictation';
import WordSelection from './WordSelection';
import StudyPhrase from '../../components/StudyPhrase';
import { isEmpty } from 'lodash';
import { NavigationScreenProp } from 'react-navigation';

export interface IState {
    answer: TAnswer;
    progress: number;
}

export interface IAnswerProps {
    collectAnswer: (answer: TAnswer) => void;
}

interface IProps {
    question: IQuestion;
    navigation: NavigationScreenProp<any, any>
}

export default class Questions extends React.Component<IProps, IState> {

    public state = {
        answer: null,
        progress: 0
    };

    static navigationOptions = {
        header: null,
    };

    collectAnswer = (answer: TAnswer) => {
        this.setState({ answer });
    }

    submitAllowed = () => isEmpty(this.state.answer)

    getCurrentQuestion = () => {
        const { questions, currentQuestionIndex } = this.props.navigation.state.params;
        return questions[currentQuestionIndex];
    }

    componentWillMount () {
        const { questions, currentQuestionIndex } = this.props.navigation.state.params;
        const progress = currentQuestionIndex / questions.length;
        this.setState({ progress })
    }

    determineQuestionType = () => {
        let QuestionComponent;
        const question = this.getCurrentQuestion();

        switch (question.questionType) {
            case 'TRANSLATION':
                QuestionComponent = Translation;
                break;
            case 'WORD_SELECTION':
                QuestionComponent = WordSelection;
                break;
            case 'DICTATION':
                QuestionComponent = Dictation;
                break;
            case 'MULTI_CHOICE':
                QuestionComponent = MultiChoice;
                break;
            default:
                throw new Error('Unknown Type');
        }
        return <QuestionComponent {...question } collectAnswer={this.collectAnswer} />
    }

    nextQuestion = () => {
        const { navigate, state } = this.props.navigation;
        const { questions, currentQuestionIndex, failedQuestions } = state.params;
        const nextQuestionIndex = currentQuestionIndex + 1
        if (questions[nextQuestionIndex]) {
            navigate('Questions', { questions, currentQuestionIndex: nextQuestionIndex })
        } else {
            if (failedQuestions && failedQuestions[0]) {
                navigate('Questions', { questions, currentQuestionIndex: nextQuestionIndex })
            } else {
                navigate('Completion')
            }
        }
    }

    existQuestions = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Modules' })
            ]
        })
        return () => this.props.navigation.dispatch(resetAction)
    }

    render () {
        const question = this.getCurrentQuestion();
        return (
            <Container >
                <View style={styles.header}>
                    <View style={styles.progress}>
                        <ProgressBar
                            progress={this.state.progress}
                            width={270}
                            borderColor={Colors.lightGray}
                            color={Colors.green}
                            unfilledColor='#d3d3d3'
                            animated style={{ height: 5 }}
                        />
                    </View>
                    <Icon name='close' style={styles.close} onPress={this.existQuestions()} />
                </View>
                <Body style={styles.body}>
                    <StudyPhrase
                        sentence={question.studyPhrase.text}
                        sound={{ soundTrack: question.studyPhrase.soundFile }}
                        showSentence={question.questionType !== 'DICTATION'}
                    />
                    {this.determineQuestionType()}
                </Body>
                <View style={styles.footer}>
                    <Button
                        primary
                        rounded
                        block
                        disabled={this.submitAllowed()}
                        style={{ width: 300, alignSelf: 'center' }}
                        onPress={this.nextQuestion}
                    >
                        <Text style={{ alignSelf: 'center' }}>
                            {I18n.t('questions.submit')}
                        </Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        height: 60
    },
    body: {
        marginTop: 40,
        flex: 1,
        alignContent: 'stretch',
        width: 340,
    },
    footer: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        marginBottom: 10,
    },
    progress: {
        flexDirection: 'row',
        alignContent: 'center',
        alignSelf: 'center',
        paddingTop: 40,
        borderWidth: 0
    },
    close: {
        position: 'absolute',
        left: 15,
        top: 22,
        fontSize: 40,
        color: 'gray'
    }
});