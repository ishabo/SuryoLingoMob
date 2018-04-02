import * as React from 'react';
import { Text, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import glamor from 'glamorous-native';

interface ITitleProps {
  title?: string;
  navigate (): boolean;
}

const GSTouchable: any = glamor(TouchableOpacity)({
  width: 100,
  height: 40,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
});

export default ({ title, navigate }: ITitleProps) =>
  title && <GSTouchable
    onPress={() => navigate()}>
    <Icon name="list" />
    <Text>
      {title}
    </Text>
  </GSTouchable > || <Text></Text>;


