import React from 'react';
import { StyleSheet, ViewStyle, Platform, Keyboard } from 'react-native';
import {
    Container,
    Input,
    Content,
    Item
} from 'native-base';

interface IProps {
    placeholder: string;
    captureInput: (input: string) => void;
    style?: ViewStyle
}

export default class Translation extends React.Component<IProps> {

    render () {
        const rtl = Platform.OS === 'ios' ? { writingDirection: 'rtl' } : {}
        return (
            <Container style={styles.container}>
                <Content style={styles.translationBox}>
                    <Item regular>
                        <Input
                            placeholder={this.props.placeholder}
                            multiline
                            numberOfLines={5}
                            style={[rtl, styles.textArea, this.props.style || {}]}
                            onChangeText={this.props.captureInput}
                            onSubmitEditing={Keyboard.dismiss}
                        />
                    </Item>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
    },
    translationBox: {
        marginTop: 20
    },
    textArea: {
        height: 150,
        textAlign: 'right',
        textAlignVertical: 'top'
    }
});