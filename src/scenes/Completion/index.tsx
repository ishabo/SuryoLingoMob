import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import I18n from 'I18n';
import config from 'config/';
import { connect } from 'react-redux';
import { finishLesson } from 'services/progress/actions';
import { ILesson } from 'services/skills';
import { GSContainer, GSCongratMessage, GSXPGain } from './index.styles';
import { IInitialState } from 'services/reducers';
import { getLessonInProgress } from 'services/selectors';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  finishLesson?: (lessonXP: number) => void;
  lessonInProgress: ILesson;
}

class Completion extends React.Component<IProps> {

  static navigationOptions = {
    header: null,
  };

  componentDidMount () {
    setTimeout(() => this.props.finishLesson(config.lessonXP), 200);
  }

  render () {
    const { order } = this.props.lessonInProgress;
    return (
      <GSContainer>
        <GSCongratMessage>
          {I18n.t('questions.congratulations', { order })}
        </GSCongratMessage>
        <GSXPGain>
          {I18n.t('questions.xpGain', { xp: '10' })}
        </GSXPGain>
      </GSContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  finishLesson: (lessonXP: number) =>
    dispatch(finishLesson(lessonXP)),
});

const mapStateToDispatch = (state: IInitialState) => ({
  lessonInProgress: getLessonInProgress(state),
});

export default connect(mapStateToDispatch, mapDispatchToProps)(Completion);
