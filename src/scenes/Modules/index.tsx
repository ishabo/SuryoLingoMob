import React from 'react';
import { Container } from 'native-base';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../i18n';
import Module from './Module';
import { mapValues, groupBy } from 'lodash';
import { IModule } from '../../services/modules/reducers';
import { ICourse } from '../../services/courses/reducers';
import Colors from '../../styles/colors';
import glamor from 'glamorous-native';
import shortid from 'shortid'

interface State { }

class Modules extends React.Component<any, State> {

	static navigationOptions = {
		title: I18n.t('modulesList'),
		headerRight: null,
		headerLeft: null,
		goBack: false,
		cardStack: {
			transition: (previousRoute: any) => { // configure the animation here 
				alert(previousRoute)
			}
		},
	};

	private goToLessons = (module: IModule) => {
		const { navigate } = this.props.navigation;
		const course = this.props.courses.find((course: ICourse) => module.courseId === course.id);
		navigate('Lessons', { module, course });
	}

	private renderLevel = (level: number) => {
		return <GSLevel key={shortid.generate()}>
			<Text>{I18n.t('modules.level', { level })}</Text>
		</GSLevel>
	}

	private renderUnits () {
		const modules = mapValues(groupBy(this.props.modules, 'unit'));
		const units = Object.keys(modules);
		let level = 1;

		const mappedUnits: any[] = [
			this.renderLevel(level)
		];

		units.forEach((unit: string | number) => {
			if (modules[unit][0].level !== level) {
				level = modules[unit][0].level;
				mappedUnits.push(this.renderLevel(level));
			}
			mappedUnits.push(<View key={shortid.generate()} style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
				{this.renderModules(modules[unit])}
			</View>);
		});

		return mappedUnits
	}

	private renderModules (modules: IModule[]) {
		return modules.map((module: IModule) =>
			<Module key={`module_${module.id}`} moduleData={module} onModuleClick={() => this.goToLessons(module)} />);
	}

	render () {
		return (
			<Container>
				<ScrollView style={{ flexDirection: 'column' }}>
					{this.renderUnits()}
				</ScrollView>
			</Container>
		);
	}
}

const GSLevel = glamor.view({
	alignItems: 'center',
	marginHorizontal: 50,
	marginVertical: 20,
	borderRadius: 5,
	backgroundColor: Colors.lightGray,
	padding: 10
});

const mapStateToProps = (state: any) => ({
	modules: state.modules,
	courses: state.courses,
	progress: state.progress
});

export default connect(mapStateToProps)(Modules)