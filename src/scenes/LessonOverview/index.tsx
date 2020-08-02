import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { IInitialState } from '@sl/services/reducers';
import { IQuestion, IPhrase } from '@sl/services/questions';
import { getPhrases } from '@sl/services/selectors';
import { StudyPhrase } from '@sl/components';
import shortid from 'shortid';
import analytics from '@react-native-firebase/analytics';
import {
  GSContainer,
  GSOverview,
  GSPhrase,
  GSTranslation,
} from './index.styles';
interface IProps {
  phrases: IPhrase[];
  questions: IQuestion;
  isAdmin: boolean;
}

class LessonOverview extends React.Component<IProps> {
  componentDidMount() {
    analytics().setCurrentScreen(this.constructor.name);
  }

  render() {
    return (
      <GSContainer>
        <ScrollView style={{ flexDirection: 'column' }}>
          {this.props.phrases.map((phrase: IPhrase) => (
            <GSOverview key={shortid.generate()}>
              <GSPhrase>
                <StudyPhrase
                  isAdmin={this.props.isAdmin}
                  showSentence
                  sound={{ soundTrack: phrase.sound }}
                  sentence={phrase.sentence}
                  lang="cl-syr"
                />
              </GSPhrase>
              <GSTranslation>{phrase.translation}</GSTranslation>
            </GSOverview>
          ))}
        </ScrollView>
      </GSContainer>
    );
  }
}

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  phrases: getPhrases(state),
  isAdmin: state.profile.isTester,
});

export default connect(mapStateToProps, null)(LessonOverview);
