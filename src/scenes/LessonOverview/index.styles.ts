import glamor from 'glamorous-native'
import { Container } from 'native-base'

export const GSContainer = glamor(Container)({
  padding: 16,
})
GSContainer.displayName = 'GSContainer'

export const GSOverview = glamor.view({
  paddingVertical: 20,
})
GSOverview.displayName = 'GSOverview'

export const GSPhrase = glamor.view({})
GSPhrase.displayName = 'GSPhrase'

export const GSTranslation = glamor.text({
  textAlign: 'right',
})
GSTranslation.displayName = 'GSTranslation'
