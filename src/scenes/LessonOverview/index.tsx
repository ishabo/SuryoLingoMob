import React from 'react';
import glamor from 'glamorous-native';
import { Container } from 'native-base';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { IInitialState } from 'services/reducers';
import { IQuestion, IPhrase } from 'services/questions';
import { getPhrases } from 'services/selectors';
import { StudyPhrase } from 'components';

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

const LessonOverview = ({ phrases, isAdmin }: IProps) => (
  <GSContainer>
    <ScrollView style={{ flexDirection: 'column' }}>
      {phrases.map((phrase: IPhrase) => (
        <GSOverview>
          <GSPhrase>
            <StudyPhrase
              isAdmin={isAdmin}
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

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  phrases: getPhrases(state),
  isAdmin: state.profile.isTester
});

export default connect(
  mapStateToProps,
  null
)(LessonOverview);
