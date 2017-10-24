import React from 'react';
import { StyleSheet } from 'react-native';
import I18n from '../../i18n';
import { Container, Text } from 'native-base';
import modules from '../../data/modules';
import { connect } from 'react-redux';
import { saveModules } from '../../services/modules/actions';

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
	}
});

class Splash extends React.Component<any, State> {

	static navigationOptions = {
		title: null,
		goBack: false
	};

	componentWillMount () {
		this.props.saveModules(modules);
	}

	componentDidMount () {
		const { navigate } = this.props.navigation;
		setTimeout(() => {
			navigate('Modules');
		}, 500)
	}

	render () {
		return (
			<Container style={styles.container}>
				<Text style={styles.welcome}>
					{I18n.t('greeting')}
				</Text>
			</Container>
		);
	}
}

const mapDispatchToProps = (dispatch: any) => ({
	saveModules: (modules: IModule[]) => dispatch(saveModules(modules))
});

export default connect(null, mapDispatchToProps)(Splash);