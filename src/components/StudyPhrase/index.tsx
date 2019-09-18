import * as React from 'react';
import Phrase, { IProps as IPhraseProps } from '@sl/components/Phrase';
import { SoundButton } from '@sl/components';
import glamor from 'glamorous-native';
import { getWindowWidth, openPhraseInAdmin } from '@sl/helpers';
import I18n from '@sl/i18n';
import { TouchableOpacity, Text } from 'react-native';

interface IProps extends IPhraseProps {
  sound: { soundTrack: string; location?: string };
  showSentence: boolean;
  centralize?: boolean;
  isAdmin?: boolean;
}

export default (props: IProps) => {
  const { showSentence, sentence, sound, lang, centralize, isAdmin } = props;

  const renderEditLink = () =>
    isAdmin && (
      <TouchableOpacity onPress={() => openPhraseInAdmin(sentence.raw)}>
        <Text>{I18n.t('questions.correction')}</Text>
      </TouchableOpacity>
    );

  const renderSound = () => (
    <SoundButton
      key={'soundTrack'}
      disabled={sound === null}
      {...sound}
      size={centralize ? { large: true } : { small: true }}
    />
  );

  const renderPhrase = () => (
    <>
      <Phrase key={lang + 'phrase'} obscureText={!showSentence} sentence={sentence} lang={lang} />
      {renderEditLink()}
    </>
  );

  const content = [];

  sound && content.push(renderSound());

  centralize || content.push(renderPhrase());

  return <GSContainer centralize={centralize}>{content}</GSContainer>;
};

const GSContainer = glamor.view<{ centralize: boolean }>(
  {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginBottom: 10,
    justifyContent: 'space-between',
    maxWidth: getWindowWidth() - 50
  },
  props => {
    return {
      marginTop: props.centralize ? 20 : 0,
      justifyContent: props.centralize ? 'center' : 'flex-start',
      alignSelf: props.centralize ? 'center' : 'flex-start'
    };
  }
);
