import React from 'react';
import { Text, Button } from 'native-base';
import glamor from 'glamorous-native';

interface IProps {
  disabled?: boolean;
  wide?: boolean;
  restProps?: any;
  onPress: () => void;
  text: string;
}

export default (
  { disabled = false,
    wide = true,
    onPress,
    text,
    restProps = { success: true } }: IProps,
) => {
  console.log(wide);
  return <GSButton
    rounded
    block
    wide
    buttonWidth
    disabled={disabled}
    onPress={onPress}
    {...restProps}
  >
    <Text style={{ alignSelf: 'center' }}>
      {text}
    </Text>
  </GSButton>;
};

const GSButton = glamor(Button)<{ wide: boolean }>(
  {
    alignSelf: 'center',
  },
  ({ wide }) => ({
    width: wide ? 280 : 140,
    alignSelf: wide ? 'center' : 'stretch',
  }),
);
