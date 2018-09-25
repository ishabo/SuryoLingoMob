import React from 'react';
import glamor from 'glamorous-native';
import Images from 'assets/images';

const GSImage = glamor.image({
  width: 40,
  height: 40
});

export default ({ icon }: { icon: string }) => <GSImage source={Images.icons[icon]} />;
