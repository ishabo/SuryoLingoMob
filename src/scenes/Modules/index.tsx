import React from 'react';
import I18n from '../../i18n';
import { Container } from 'native-base';
import { ScrollView, View } from 'react-native';
import Module from './Module';
import { connect } from 'react-redux';
import { mapValues, groupBy } from 'lodash';

interface State { }

class Modules extends React.Component<any, State> {

	static navigationOptions = {
		title: I18n.t('modulesList'),
		headerRight: null,
		headerLeft: null,
		goBack: false,
	};

	private goToLessons = (module: IModule) => {
		const { navigate } = this.props.navigation;
		navigate('Lessons', { module });
	}

	private renderLevels () {
		const modules = mapValues(groupBy(this.props.modules, 'level'));
		const levels = Object.keys(modules)
		const mappedLevels: any[] = [];

		levels.forEach((level: string | number) => {
			if (modules[level].length > 3) {
				throw new Error('modules for each level should not exceed 3');
			}
			mappedLevels.push(<View key={`level_${level}`} style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
				{this.renderModules(modules[level])}
			</View>);
		});

		return mappedLevels
	}

	private renderModules (modules: IModule[]) {
		return modules.map((module: IModule) =>
			<Module key={module.id} moduleData={module} onModuleClick={() => this.goToLessons(module)} />);
	}

	render () {
		return (
			<Container>
				<ScrollView style={{ flexDirection: 'column' }}>
					{this.renderLevels()}
				</ScrollView>
			</Container>
		);
	}
}

const mapStateToProps = (state: any) => ({
	modules: state.modules
});

export default connect(mapStateToProps)(Modules)