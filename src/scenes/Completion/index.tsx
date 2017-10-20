import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';

interface IProps { }

export default class Completion extends React.Component<IProps> {

    render () {
        return (
            <Container style={styles.container}>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
    }
});