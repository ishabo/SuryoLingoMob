import { CustomText } from 'styles/text';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';

export const GSHints = glamor.view({
  flex: 1,
  backgroundColor: Colors.lightBlack,
  paddingVertical: 5,
  justifyContent: 'center',
  borderRadius: 5,
  width: 150,
  height: 200,
});

export const GSHintBlock = glamor.view<{ last: boolean }>(
  {
    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderColor: Colors.lightBlack,
  },
  props => !props.last ? ({
    borderBottomColor: Colors.darkWhite,
  }) : null,
);

export const GSHintText = glamor.text({
  color: Colors.white,
  textAlign: 'center',
  alignSelf: 'stretch',
});

export const GSHintedSentence = glamor.view({
  flexDirection: 'row',
  justifyContent: 'center',
});

export const GSSentence = glamor(CustomText)<{ underline: boolean }>(
  {
    padding: 0,
    margin: 0,
    marginHorizontal: 4,
    fontSize: 20,
    alignSelf: 'center',
  },
  props => props.underline ? ({
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
  }) : null,
);
