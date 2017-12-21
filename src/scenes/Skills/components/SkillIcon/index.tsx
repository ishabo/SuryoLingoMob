import React from 'react';
import { Image } from 'react-native';
import glamor from 'glamorous-native';

const GSIcon = glamor(Image)<{ size: number }>(
  {
    alignSelf: 'center',
  },
  props => ({
    width: props.size || 100,
    height: props.size || 100,
  }),
);

export default ({ icon, size }: { icon: string; size?: number; }) =>
  <GSIcon source={{ uri: 'data:image/png;base64,' + icon }} size={size} />;

