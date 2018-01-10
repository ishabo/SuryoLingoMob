import glamor from 'glamorous-native';
import Colors from 'styles/colors';

interface IWordProps {
  shadowed?: boolean;
}

export const GSWordBox = glamor.view({
  height: 40,
  marginRight: 10,
  marginBottom: 10,
});

export const GSWordText = glamor.text<IWordProps>(
  {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    padding: 10,
  },
  props => ({
    color: props.shadowed ? Colors.darkGray : Colors.black,
    backgroundColor: props.shadowed ? Colors.darkGray : Colors.white,
  }),
);


export const GSSelectionBox = glamor.view({
  alignContent: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
  height: 120,
});

export const GSAnswerBox = glamor.view({
  padding: 10,
  height: 120,
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  backgroundColor: Colors.lightGray,
  marginVertical: 40,
  alignContent: 'flex-start',
});