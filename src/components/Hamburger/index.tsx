import React from 'react'
import glamor from 'glamorous-native'
import { Icon } from 'native-base'

export default ({ onPress }: { onPress(): void }) => (
  <GSBars onPress={onPress}>
    <Icon type='FontAwesome' name='bars' />
  </GSBars>
)

const GSBars = glamor.touchableOpacity({
  width: 50,
  height: 40,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
})
