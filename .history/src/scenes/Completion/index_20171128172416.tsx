import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Container } from 'native-base';
import glamor from 'glamorous-native';
import I18n from '../../i18n';
import { connect } from 'react-redux';
import { backToModules } from '../../helpers/navigation'
import { setLessonDone } from '../../services/progress/actions';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  setLessonDone: (lessonId: string) => {}
}

class Completion extends React.Component<IProps> {

  static navigationOptions = {
    header: null,
  };

  componentDidMount () {
    const { lessonId } = this.props.navigation.state.params

    this.props.setLessonDone(lessonId)
    setTimeout(() => {
      backToModules(this.props.navigation)
    }, 2000)
  }

  render () {
    const { lessonId } = this.props.navigation.state.params

    return (
      <GSContainer>
        <GSCongratMessage>
          {I18n.t('questions.congratulations', { lessonId: lessonId })}
        </GSCongratMessage>
        <GSXPGain>
          {I18n.t('questions.xpGain', { xp: '10' })}
        </GSXPGain>
      </GSContainer>
    );
  }
}

const GSContainer = glamor(Container)({
  alignSelf: 'center',
  justifyContent: 'center',
});

const GSCongratMessage = glamor.text({
  padding: 50,
  fontSize: 30,
  textAlign: 'center'

});

const GSXPGain = glamor.text({
  padding: 20,
  fontSize: 20,
  textAlign: 'center',
});

const mapDispatchToProps = (dispatch: any) => ({
  setLessonDone: (lessonId: string) => dispatch(setLessonDone(lessonId))
});

export default connect(null, mapDispatchToProps)(Completion);