import React from 'react';
import { Text, Button } from 'native-base';

interface IProps {
  disabled: boolean;
  onPress: () => void;
  text: string;
}

export default ({ disabled, onPress, text }: IProps) => <Button
  primary
  rounded
  block
  style={{ width: 300, alignSelf: 'center' }}
  disabled={disabled}
  onPress={onPress}
>
  <Text style={{ alignSelf: 'center' }}>
    {text}
  </Text>
</Button>;
