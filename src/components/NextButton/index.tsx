import * as React from 'react';
import { Button } from 'native-base';
import glamor from 'glamorous-native';
import { calcWindowWidth } from 'helpers';
import { GSCustomText, ICustomText } from 'styles/text';
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
    onPressIn={onPress}
    disabled={disabled}
  >
    <GSButtonText lang={lang} light={restProps.light}>
      {text}
    </GSButtonText>
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
      width = 120;
    }
    return { width, alignSelf };
  },
);

interface IButtonText extends ICustomText { light: boolean }

const GSButtonText = glamor(GSCustomText)<IButtonText>({
  alignSelf: 'center',
}, props => ({
  color: props.light ? Colors.lightBlack : Colors.white
}));