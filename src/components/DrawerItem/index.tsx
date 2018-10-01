import React from 'react';
import glamor from 'glamorous-native';
import Images from 'assets/images';
import { GSCustomText, ICustomText } from 'styles/text';
import colors from 'styles/colors';

export const GSDrawerLabel = glamor.view({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20
});

export const GSDrawerLabelText = glamor(GSCustomText)<ICustomText>({
  fontSize: 18,
  color: colors.orange,
  margin: 10,
  padding: 10,
  flexDirection: 'row-reverse',
  justifyContent: 'space-between'
});

const GSImage = glamor.image({
  width: 40,
  height: 40
});

export interface IProps {
  label: string;
  icon: string;
}

export default ({ label, icon }: IProps) => (
  <GSDrawerLabel>
    <GSImage source={Images.icons[icon]} />
    <GSDrawerLabelText>{label}</GSDrawerLabelText>
  </GSDrawerLabel>
);
