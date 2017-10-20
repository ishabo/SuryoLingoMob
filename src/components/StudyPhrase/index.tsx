import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import Speaker from '../Speaker';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 330,
        alignContent: 'center',
    },
    sentence: {
        alignSelf: 'center',
        marginLeft: 10
    },
});

interface IProps {
    sound: { soundTrack: string; location?: string; }
    sentence: string;
    showSentence?: boolean;
}

const StudyPhrase = ({ sound, sentence, showSentence }: IProps) =>
    <View style={[styles.container, { justifyContent: showSentence ? 'flex-start' : 'center' }]}>
        <View>
            <Speaker {...sound} size={showSentence ? { small: true } : { large: true }} />
        </View>
        {showSentence && <Text style={styles.sentence}>{sentence}</Text>}
    </View>

export default StudyPhrase;