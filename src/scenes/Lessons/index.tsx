import React from 'react';
import { Container, Text, CardItem, Card } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';

interface ILesson {
    words: string | string[];
    lessonId: number;
}

export interface State {
    lessons: ILesson[];
}

const styles: any = StyleSheet.create({
    card: {
        width: 300,
        alignItems: 'center',
        height: 500,
        shadowOffset: { width: 0, height: 400 },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        elevation: 1,
        shadowRadius: 2
    },

    container: {
        flex: 1,
        alignItems: 'center',
        height: 600,
        alignSelf: 'stretch',
    },

    navArea: {
        flex: 1,
        alignContent: 'stretch',
        justifyContent: 'center',
        height: 400,
        width: 300
    }
})

export default class Lessons extends React.Component<any, State> {

    private carousel: any;
    constructor(props: any) {
        super(props);
        this.state = {
            lessons: [
                {
                    words: 'ܐܢܐ, ܐܢܬ, ܐܢܬܘܢ, ܗܘ, ܗܝ',
                    lessonId: 1,
                },
                {
                    words: 'ܐܝܟܐ, ܐܝܟܢܐ, ܟܡܐ, ܡܐ',
                    lessonId: 2,
                },
                {
                    words: 'ܙܒܢܐ, ܚܙܘܪܐ, ܬܢܐ, ܐܝܠܢܐ',
                    lessonId: 3
                }
            ]
        }
    }

    static navigationOptions = {
        title: 'Lessons'
    };

    goToQuestions = (lessonId: number) => {
        const { navigate } = this.props.navigation;
        navigate('Questions', { lessonId });
    }

    renderCards ({ item, _ }) {
        return <Card style={styles.card}>
            <CardItem style={{ width: 300, height: 400 }}>
                <TouchableOpacity style={styles.navArea} onPress={() => { this.goToQuestions(item.lessonId) }}>
                    <Text style={{ alignSelf: 'center' }}>{item.words}</Text>
                </TouchableOpacity>
            </CardItem>
        </Card >
    }

    render () {
        return (
            <Container style={styles.container}>
                <Carousel
                    ref={(c) => { this.carousel = c; }}
                    data={this.state.lessons}
                    renderItem={this.renderCards.bind(this)}
                    sliderWidth={390}
                    itemWidth={300}
                />
            </Container>
        )
    }
}
