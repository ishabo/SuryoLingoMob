import glamor from 'glamorous-native';

export const GSContainer = glamor.view({
  alignSelf: 'center',
  justifyContent: 'center'
});
GSContainer.displayName = 'GSContainer';

export const GSCongratMessage = glamor.text({
  padding: 50,
  fontSize: 30,
  textAlign: 'center'
});
GSCongratMessage.displayName = 'GSCongratMessage';

export const GSXPGain = glamor.text({
  padding: 20,
  fontSize: 20,
  textAlign: 'center'
});
GSXPGain.displayName = 'GSXPGain';

export const GSNextButton = glamor.view({
  height: 100,
  justifyContent: 'space-between',
  marginVertical: 5
});
GSNextButton.displayName = 'GSNextButton';
