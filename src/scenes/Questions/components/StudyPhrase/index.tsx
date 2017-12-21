import React from 'react';
import { View } from 'native-base';
import Speaker from '../Speaker';
import glamor from 'glamorous-native';

interface IProps {
  sound: { soundTrack: string; location?: string; };
  sentence: string;
  showSentence?: boolean;
}

export default (props: IProps) => {
  const { showSentence, sentence, sound } = props;
  return (
    <GSContainer showSentence={showSentence} >
      <View>
        <Speaker {...sound} size={showSentence ? { small: true } : { large: true }} />
      </View>
      {showSentence && <GSSentence>{sentence}</GSSentence>}
    </GSContainer>
  );
};

const GSContainer = glamor.view<{ showSentence: boolean }>(
  {
    width: 330,
    flexDirection: 'row',
    alignContent: 'center',
  },
  (props) => {
    return {
      justifyContent: props.showSentence ? 'flex-start' : 'center',
    };
  },
);

const GSSentence = glamor.text({
  alignSelf: 'center',
  marginLeft: 10,
});
