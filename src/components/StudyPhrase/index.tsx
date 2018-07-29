import * as React from 'react';
import Phrase, { IProps as IPhraseProps } from 'components/Phrase';
import { SoundButton } from 'components';
import glamor from 'glamorous-native';
import { getWindowWidth, openPhraseInAdmin } from 'helpers';
import SwitchButton from 'components/SwitchButton';
import I18n from 'I18n';

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
      <SwitchButton
        onPress={() => openPhraseInAdmin(sentence.raw)}
        text={I18n.t('questions.correction')}
        light={true}
        lang={'cl-ara'}
      />
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

  if (sound) {
    content.push(renderSound());
  }

  if (!centralize) {
    content.push(renderPhrase());
  }

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