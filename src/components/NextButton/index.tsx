import React from 'react';
import { Text, Button } from 'native-base';
import glamor from 'glamorous-native';

interface IProps {
  disabled?: boolean;
  onPress: () => void;
  text: string;
  restProps?: any;
}

export default (
  { disabled = false,
    onPress,
    text,
    restProps = { success: true } }: IProps,
) => <GSButton
  rounded
  block
  disabled={disabled}
  onPress={onPress}
  {...restProps}
>
    <Text style={{ alignSelf: 'center' }}>
      {text}
    </Text>
  </GSButton>;

const GSButton = glamor(Button)({
  width: 300, alignSelf: 'center',
});
