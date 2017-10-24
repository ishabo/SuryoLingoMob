import React from 'react';
import I18n from '../../i18n';
import { Container } from 'native-base';
import { ScrollView } from 'react-native';
import Module from './Module';
import { connect } from 'react-redux';

interface State { }

class Modules extends React.Component<any, State> {

	static navigationOptions = {
		title: I18n.t('modulesList'),
		headerRight: null
	};

	private goToLessons = (module: IModule) => {
		const { navigate } = this.props.navigation;
		navigate('Lessons', { module });
	}

	private renderModules () {
		return this.props.modules.map((module: IModule, _: number) =>
			<Module key={_} moduleData={module} onModuleClick={() => this.goToLessons(module)} />);
	}

	render () {
		return (
			<Container>
				<ScrollView>
					{this.renderModules()}
				</ScrollView>
			</Container>
		);
	}
}

const mapStateToProps = (state: any) => ({
	modules: state.modules
});

export default connect(mapStateToProps)(Modules)