import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import Speaker from '../Speaker';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 330
    },
    sentence: {
        alignSelf: 'center',
        marginLeft: 10
    }
});
interface IProps {
    sound: { soundTrack: string; location?: string; }
    sentence: string;
}

const StudySentence = ({ sound, sentence }: IProps) =>
    <View style={styles.container}>
        <Speaker {...sound} />
        <Text style={styles.sentence}>{sentence}</Text>
    </View>

export default StudySentence;