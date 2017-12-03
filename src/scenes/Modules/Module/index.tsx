import React from 'react';
import I18n from '../../../i18n';
import { TouchableOpacity, View } from 'react-native';
import glamor from 'glamorous-native';
// import Colors from '../../../styles/colors';
import { IModule } from '../../../services/modules/reducers';

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
                <TouchableOpacity onPress={this.props.onModuleClick}>
                    <View>
                        <GSCircle>
                            <GSCircle style={{ top: 5, left: 5, width: 70, height: 70, borderColor: 'gray', borderWidth: 0.5 }} />
                        </GSCircle>
                        <GSTriangle style={{ alignSelf: 'center', top: -14, zIndex: 100 }}>
                        </GSTriangle>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.props.onModuleClick}>
                    <GSModuleTitle>
                        {I18n.t(`modules.${name}`)}
                    </GSModuleTitle>
                </TouchableOpacity>
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
const GSCircle = glamor.view({
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: 'white',
});

const GSTriangle = glamor.view({
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 31.,
    borderRightWidth: 31.2,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [{ rotate: '180deg' }]
})