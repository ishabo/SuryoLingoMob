import React from 'react';
import I18n from '../../../i18n';
import { TouchableHighlight } from 'react-native';
import glamor from 'glamorous-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../../styles/colors';

export interface Props {
    onModuleClick: () => void,
    moduleData: IModule
}

export interface State { }

export default class Module extends React.Component<Props, State> {
    render () {
        const { name } = this.props.moduleData;
        return (
            <GSModule>
                <TouchableHighlight onPress={this.props.onModuleClick}>
                    <GSPicture>
                        <LinearGradient
                            colors={[Colors.lightGreen, Colors.green, Colors.darkGreen]}
                            style={{
                                flex: 1,
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2,
                            }}
                        />
                    </GSPicture>
                </TouchableHighlight>

                <TouchableHighlight onPress={this.props.onModuleClick}>
                    <GSModuleTitle>
                        {I18n.t(`modules.${name}`)}
                    </GSModuleTitle>
                </TouchableHighlight>
            </GSModule>

        );
    }
}

const GSModule = glamor.view({
    flexDirection: 'column',
    marginTop: 20,
    alignContent: 'center'
});

const GSModuleTitle = glamor.text({
    alignSelf: 'center',
    marginTop: 10
})
const GSPicture = glamor.view({
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
});