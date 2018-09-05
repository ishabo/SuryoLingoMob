import glamor from 'glamorous-native';

export const GSContainer = glamor.view({
  alignSelf: 'center',
  justifyContent: 'center'
});

export const GSCongratMessage = glamor.text({
  padding: 50,
  fontSize: 30,
  textAlign: 'center'
});

export const GSXPGain = glamor.text({
  padding: 20,
  fontSize: 20,
  textAlign: 'center'
});

export const GSNextButton = glamor.view({
  height: 100,
  justifyContent: 'space-between',
  marginVertical: 5
});
