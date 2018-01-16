import React from 'react';
import Phrase, { IProps as IPhraseProps } from './components/Phrase';
import SoundButton from './components/SoundButton';
import glamor from 'glamorous-native';

interface IProps extends IPhraseProps {
  sound: { soundTrack: string; location?: string; };
  showSentence: boolean;
}

export default (props: IProps) => {
  const { showSentence, sentence, sound, lang } = props;

  return (
    <GSContainer showSentence={showSentence} >
      {
        sound.soundTrack &&
        <SoundButton {...sound} size={showSentence ? { small: true } : { large: true }} />
      }
      {(showSentence || sound.soundTrack === null) && <Phrase sentence={sentence} lang={lang} />}
    </GSContainer>
  );
};

const GSContainer = glamor.view<{ showSentence: boolean }>(
  {
    flexDirection: 'row',
    alignContent: 'center',
  },
  (props) => {
    return {
      justifyContent: props.showSentence ? 'flex-start' : 'center',
    };
  },
);

