import React from 'react';
import Phrase, { IProps as IPhraseProps } from './components/Phrase';
import SoundButton from './components/SoundButton';
import glamor from 'glamorous-native';

interface IProps extends IPhraseProps {
  sound: { soundTrack: string; location?: string; };
  showSentence: boolean;
  centralize?: boolean;
}

export default (props: IProps) => {
  const { showSentence, sentence, sound, lang, centralize } = props;
  const setnenceToshow = showSentence && sentence || '----- ------ ----------';

  return (
    <GSContainer centralize={centralize} >
      {
        sound.soundTrack &&
        <SoundButton {...sound} size={centralize ? { large: true } : { small: true }} />
      }
      {centralize || <Phrase obscureText={!showSentence} sentence={setnenceToshow} lang={lang} />}
    </GSContainer>
  );
};

const GSContainer = glamor.view<{ centralize: boolean }>(
  {
    flexDirection: 'row',
    alignContent: 'center',
  },
  (props) => {
    return {
      justifyContent: props.centralize ? 'center' : 'flex-start',
    };
  },
);

