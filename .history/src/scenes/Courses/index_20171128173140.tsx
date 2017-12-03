import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Text } from 'native-base';
import { ICourse } from '../../services/courses/reducers';
import glamor from 'glamorous-native';
import I18n from '../../i18n';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';

export interface State { }
const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
});

class Courses extends React.Component<any, State> {

  static navigationOptions = {
    title: I18n.t('Courses'),
    headerLeft: null,
    headerRight: null,
  };

  private goToModules = () => {
    const { navigate } = this.props.navigation;
    navigate('Modules');
  }

  private renderCourses = () => {
    this.props.courses.map((course: ICourse) =>
      <Button>
        <Text onPress={this.goToModules}>

        </Text>
      </Button>,
    );
  }

  render () {
    return (
      <Container style={styles.container} >
        {this.renderCourses()}
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  courses: state.courses,
});

export default connect(mapStateToProps)(Courses);
