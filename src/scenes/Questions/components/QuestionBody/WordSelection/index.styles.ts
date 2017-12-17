import glamor from 'glamorous-native';
import Colors from '../../../../../styles/colors';

export const GSWordBox = glamor.view({
  height: 40,
  marginRight: 10,
  marginBottom: 10,
});

export const GSSelectionBox = glamor.view({
  alignContent: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
  height: 150,
  width: 320,
});

export const GSAnswerBox = glamor.view({
  padding: 10,
  height: 150,
  width: 320,
  flexDirection: 'row',
  flexWrap: 'wrap',
  backgroundColor: Colors.lightGray,
  marginVertical: 40,
  alignContent: 'flex-start',
  alignSelf: 'flex-start',
});

export const GSWordText = glamor.text({
  alignSelf: 'stretch',
  backgroundColor: 'white',
  padding: 10,
});
