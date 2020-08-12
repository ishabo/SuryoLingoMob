import { Container } from 'native-base'
import glamor from 'glamorous-native'

export * from '@sl/styles/text'

export const GSContainer = glamor(Container)({
  flex: 1,
  paddingTop: 30,
  alignItems: 'center',
  backgroundColor: 'white',
})
GSContainer.displayName = 'GSContainer'
