import * as React from 'react';
import { Button } from 'native-base';
import glamor from 'glamorous-native';
import { GSCustomText } from 'styles/text';

interface IProps {
  onPress: () => void;
  success?: boolean;
  bordered?: boolean;
  light?: boolean;
  text: string;
  lang: TLangs;
}

export default (props: IProps) =>
  <GSSwitchButton rounded {...props}>
    <GSCustomText lang={props.lang}>{props.text}</GSCustomText>
  </GSSwitchButton>;

const GSSwitchButton = glamor(Button)({
  paddingVertical: 0,
  marginHorizontal: 5,
  paddingHorizontal: 10,
  height: 40,
  alignItems: 'center',
});
