import React from 'react';
import { StyleSheet } from 'react-native';
import { Bar as ProgressBar } from 'react-native-progress';
import {
    Container,
    View,
    Icon,
    Header,
    Body,
    Footer,
    Text,
    Button
} from 'native-base';
import Colors from '../../../styles/colors';
import I18n from '../../../i18n';
import WordSelection from './WordSelection';
import StudySentence from '../../../components/StudySentence';

export interface State { }

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        height: 34
    },
    body: {
        marginTop: 40,
        flex: 1,
        alignContent: 'stretch',
        width: 340
    },
    footer: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
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
export default class Questions extends React.Component<any, State> {

    static navigationOptions = {
        header: null,
    };

    render () {
        return (
            <Container >
                <Header style={styles.header}>
                    <View style={styles.progress}>
                        <ProgressBar
                            progress={0.3}
                            width={270}
                            borderColor={Colors.lightGray}
                            color={Colors.green}
                            unfilledColor='#d3d3d3'
                            animated style={{ height: 5 }}
                        />
                    </View>
                    <Icon name='close' style={styles.close} />
                </Header>
                <Body style={styles.body}>
                    <StudySentence sentence='ܐܢܐ ܡܡܓܓ ܐܢܐ ܒܠܫܢܐ ܣܘܪܝܝܐ' sound={{ soundTrack: 'drawme.mp3' }} />
                    <WordSelection sentence='أنا أتكلم اللغة السريانية بشكل جيد جداً' />
                </Body>
                <Footer style={styles.footer}>
                    <Button primary rounded block style={{ width: 300 }}>
                        <Text style={{ alignSelf: 'center' }}>
                            {I18n.t('questions.submit')}
                        </Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}
