import React from 'react';
import { Button } from 'native-base';
import glamor from 'glamorous-native';
import { calcWindowWidth } from 'helpers';
import { GSCustomText } from 'styles/text';
import Colors from 'styles/colors';

interface IProps {
  disabled?: boolean;
  restProps?: any;
  onPress: () => void;
  text: string;
  lang: TLangs;
}

export default (
  {
    disabled = false,
    onPress,
    text,
    lang,
    restProps = { success: true, wide: true } }: IProps,
) => {
  return <GSButton
    {...restProps}
    rounded
    block
    onPress={onPress}
    disabled={disabled}
  >
    <GSCustomText lang={lang} style={{ alignSelf: 'center', color: restProps.light ? Colors.lightBlack : Colors.white }}>
      {text}
    </GSCustomText>
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
      width = calcWindowWidth(10);
      alignSelf = 'center';
    } else if (narrow) {
      width = 140;
      alignSelf = 'stretch';
    }
    return { width, alignSelf };
  },
);
