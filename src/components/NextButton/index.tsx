import React from 'react';
import { Text, Button } from 'native-base';
import glamor from 'glamorous-native';

interface IProps {
  disabled: boolean;
  onPress: () => void;
  text: string;
}

export default ({ disabled, onPress, text }: IProps) => <GSButton
  success
  rounded
  block
  disabled={disabled}
  onPress={onPress}
>
  <Text style={{ alignSelf: 'center' }}>
    {text}
  </Text>
</GSButton>;

const GSButton = glamor(Button)({
  width: 300, alignSelf: 'center',
});
