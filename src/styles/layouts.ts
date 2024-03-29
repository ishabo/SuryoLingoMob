import glamor from 'glamorous-native'
import { Platform, KeyboardAvoidingView } from 'react-native'

export const GSHeader = glamor.view({
  backgroundColor: 'transparent',
  borderBottomWidth: 0,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: Platform.OS === 'ios' ? 20 : 10,
})
GSHeader.displayName = 'GSHeader'

export const GSBody = glamor(KeyboardAvoidingView as any)({
  flex: 1,
  paddingHorizontal: 10,
  alignSelf: 'stretch',
  alignItems: 'stretch',
})
GSBody.displayName = 'GSBody'

export const GSFooter = glamor(KeyboardAvoidingView as any)({
  backgroundColor: 'transparent',
  justifyContent: 'flex-end',
  // marginBottom: 20,
  // position: 'absolute',
  // bottom: 0,
  // alignSelf: 'center',
  zIndex: 3000,
}) as any
GSFooter.displayName = 'GSFooter'

export const GSSeparator = glamor.view({
  marginVertical: 10,
  alignSelf: 'stretch',
  flex: 1,
})
GSSeparator.displayName = 'GSSeparator'
