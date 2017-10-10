import React from 'react';
import { I18nManager } from 'react-native';
import Routes from '../routes';
import I18n from '../i18n';

I18nManager.forceRTL(true);

export interface Props { }
export interface State { }

export default class App extends React.Component<Props, State> {

	static navigationOptions = {
		title: I18n.t('moduleList'),
	};

	render () {
		return (
			<Routes />
		);
	}
}

