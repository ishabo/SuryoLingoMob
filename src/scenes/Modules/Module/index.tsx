import React from 'react';
import I18n from '../../../i18n';
import { Button, Text } from 'native-base';
import { IModule } from '../../../data/modules';

export interface Props {
    onModuleClick: () => void,
    moduleData: IModule
}
export interface State { }

export default class Module extends React.Component<Props, State> {
    render () {
        const { name } = this.props.moduleData;
        return (
            <Button transparent onPress={this.props.onModuleClick}>
                <Text>
                    {I18n.t(`modules.${name}`)}
                </Text>
            </Button>
        );
    }
}
