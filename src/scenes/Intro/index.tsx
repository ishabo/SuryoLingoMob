import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import I18n from '../../i18n';
import { BackHandler } from 'react-native';

export interface State { }
const styles = StyleSheet.create({
    container: {
        display: 'flex',
    }
});
export default class Intro extends React.Component<any, State> {

    static navigationOptions = {
        title: I18n.t('chooseYourWay'),
        headerLeft: null,
        headerRight: null,
    };

    handleBackPress () {
        BackHandler.exitApp();
        return false;
    };

    componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    private goToModules = () => {
        const { navigate } = this.props.navigation;
        navigate('Modules');
    }

    render () {
        return (
            <View style={styles.container}>
                <Text onPress={this.goToModules}>
                    Start
                </Text>
            </View>
        );
    }
}
