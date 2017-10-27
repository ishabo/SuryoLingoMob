import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Container } from 'native-base';
import I18n from '../../i18n';
import { backToModules } from '../../helpers/navigation'
import glamor from 'glamorous-native';

interface IProps {
    navigation: NavigationScreenProp<any, any>
}

export default class Completion extends React.Component<IProps> {

    static navigationOptions = {
        header: null,
    };

    componentDidMount () {
        setTimeout(() => {
            backToModules(this.props.navigation)
        }, 2000)
    }

    render () {
        const { lessonId } = this.props.navigation.state.params

        return (
            <GSContainer>
                <GSCongratMessage>
                    {I18n.t('questions.congratulations', { lessonId: lessonId })}
                </GSCongratMessage>
                <GSXPGain>
                    {I18n.t('questions.xpGain', { xp: '10' })}
                </GSXPGain>
            </GSContainer>
        );
    }
}

const GSContainer = glamor(Container)({
    alignSelf: 'center',
    justifyContent: 'center',
});

const GSCongratMessage = glamor.text({
    padding: 50,
    fontSize: 30,
    textAlign: 'center'

});

const GSXPGain = glamor.text({
    padding: 20,
    fontSize: 20,
    textAlign: 'center',
});