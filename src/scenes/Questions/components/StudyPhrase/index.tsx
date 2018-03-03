import React from 'react';
import Phrase, { IProps as IPhraseProps } from './components/Phrase';
import SoundButton from './components/SoundButton';
import glamor from 'glamorous-native';
import { getWindowWidth } from 'helpers';

interface IProps extends IPhraseProps {
  sound: { soundTrack: string; location?: string; };
  showSentence: boolean;
  centralize?: boolean;
}

export default (props: IProps) => {
  const { showSentence, sentence, sound, lang, centralize } = props;

  const renderSound = () => <SoundButton key={'soundTrack'} {...sound} size={centralize ? { large: true } : { small: true }} />;
  const renderPhrase = () => <Phrase key={lang + 'phrase'} obscureText={!showSentence} sentence={sentence} lang={lang} />;

  const content = [];

  content.push(renderSound());

  if (!centralize) {
    content.push(renderPhrase());
  }

  return (
    <GSContainer centralize={centralize}>
      {content}
    </GSContainer>
  );
};

const GSContainer = glamor.view<{ centralize: boolean }>(
  {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginBottom: 10,
    justifyContent: 'space-between',
    maxWidth: getWindowWidth() - 50,
  },
  (props) => {
    return {
      marginTop: props.centralize ? 20 : 0,
      justifyContent: props.centralize ? 'center' : 'flex-start',
      alignSelf: props.centralize ? 'center' : 'flex-start',
    };
  },
);

