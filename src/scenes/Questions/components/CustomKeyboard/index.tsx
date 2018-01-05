import React from 'react';
import {
  Icon,
  Text,
} from 'native-base';
import shortid from 'shortid';
import {
  GSBackSpaceKey, GSContainer, GSContent,
  GSKey, GSKeyText, GSSpaceKey,
} from './index.styles';

interface IProps {
  letters: string[];
  vowels: string[];
  onKeyPress: (key: string) => void;
  onBackSpacePress: () => void;
  onSpacePress: () => void;
}

export default ({ letters, vowels, onKeyPress, onBackSpacePress, onSpacePress }: IProps) => {

  const listKeys = (keys: string[], style:
    { fontSize: number; paddingTop?: number; },
  ) =>
    keys.map((key: string) =>
      <GSKey key={shortid.generate()} primary onPress={() => onKeyPress(key)}>
        <GSKeyText style={{ ...style }}>{key}</GSKeyText>
      </GSKey>);

  return <GSContainer>
    <GSContent>
      <GSBackSpaceKey primary onPress={() => onBackSpacePress()}>
        <Icon name="ios-arrow-forward" />
      </GSBackSpaceKey>
      {listKeys(letters, { fontSize: 17, paddingTop: -20 })}
      {listKeys(vowels, { fontSize: 40, paddingTop: 0 })}
      <GSSpaceKey primary onPress={() => onSpacePress()}><Text>{'Space'}</Text></GSSpaceKey>
    </GSContent>
  </GSContainer>;
};
