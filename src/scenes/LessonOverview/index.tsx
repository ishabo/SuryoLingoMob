import React from 'react';
import glamor from 'glamorous-native';
import { Container } from 'native-base';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { IInitialState } from 'services/reducers';
import { IQuestion, IPhrase } from 'services/questions';
import { getPhrases } from 'services/selectors';
import { StudyPhrase } from 'components';
import shortid from 'shortid';
import { Analytics } from 'config/firebase';

interface IProps {
  phrases: IPhrase[];
  questions: IQuestion;
  isAdmin: boolean;
}

export const GSContainer = glamor(Container)({
  padding: 16
});

export const GSOverview = glamor.view({
  paddingVertical: 20
});

export const GSPhrase = glamor.view({});

export const GSTranslation = glamor.text({
  textAlign: 'right'
});

class LessonOverview extends React.Component<IProps> {
  componentDidMount() {
    Analytics.setCurrentScreen(this.constructor.name);
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
  isAdmin: state.profile.isTester
});

export default connect(
  mapStateToProps,
  null
)(LessonOverview);
