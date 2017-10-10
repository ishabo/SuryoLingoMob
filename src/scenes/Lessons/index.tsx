import React from 'react';
import { Text, View } from 'react-native';

export interface State { }

export default class Lessons extends React.Component<any, State> {

    static navigationOptions = {
        title: 'Lessons'
    };

    private goToQuestions = () => {
        const { navigate } = this.props.navigation;
        navigate('Questions');
    }

    render () {
        return (
            <View >
                <Text onPress={this.goToQuestions}>
                    Show questions
                </Text>
            </View>
        );
    }
}
