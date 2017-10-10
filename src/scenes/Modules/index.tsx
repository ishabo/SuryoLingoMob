import React from 'react';
import { Text, View } from 'react-native';
import I18n from '../../i18n';

export interface State { }

export default class Modules extends React.Component<any, State> {

	static navigationOptions = {
		title: I18n.t('modulesList'),
		headerRight: null
	};

	private goToLessons = () => {
		const { navigate } = this.props.navigation;
		navigate('Lessons');
	}

	render () {
		return (
			<View >
				<Text onPress={this.goToLessons}>
					Lessons
				</Text>
			</View>
		);
	}
}
