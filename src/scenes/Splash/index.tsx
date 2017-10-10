import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import I18n from '../../i18n';

export interface Props { }
export interface State { }

const styles: any = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

export default class Splash extends React.Component<any, State> {

	static navigationOptions = {
		title: null,
		goBack: false
	};

	componentDidMount () {
		const { navigate } = this.props.navigation;
		setTimeout(() => {
			navigate('Intro');
		}, 500)
	}

	render () {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					{I18n.t('greeting')}
				</Text>
			</View>
		);
	}
}
