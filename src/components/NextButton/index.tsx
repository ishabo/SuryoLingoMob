import React from 'react';
import { Text, Button } from 'native-base';
import glamor from 'glamorous-native';

interface IProps {
  disabled?: boolean;
  restProps?: any;
  onPress: () => void;
  text: string;
}

export default (
  {
    disabled = false,
    onPress,
    text,
    restProps = { success: true, wide: true } }: IProps,
) => {
  return <GSButton
    {...restProps}
    rounded
    block
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={{ alignSelf: 'center' }}>
      {text}
    </Text>
  </GSButton>;
};

const GSButton = glamor(Button)<{ wide?: boolean, narrow?: boolean }>(
  {
    alignSelf: 'center',
  },
  ({ wide, narrow }) => {
    let width;
    let alignSelf;
    if (wide) {
      width = 280;
      alignSelf = 'center';
    } else if (narrow) {
      width = 140;
      alignSelf = 'stretch';
    }
    return { width, alignSelf };
  },
);
