import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { GSCustomText } from 'styles/text';

interface IWordProps {
  shadowed?: boolean;
  selected?: boolean;
}

export const GSWordBox = glamor.view({
  height: 40,
  marginRight: 10,
  marginBottom: 10,
});

export const GSWordText = glamor(GSCustomText)<IWordProps>(
  {
    alignSelf: 'stretch',
    padding: 10,
  },
  props => ({
    color: props.shadowed ? Colors.darkGray : Colors.black,
    backgroundColor: props.shadowed
      ? Colors.darkGray
      : Colors[props.selected ? 'lightGray' : 'white'],
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
  minHeight: 120,
  flexDirection: 'row',
  flexWrap: 'wrap',
  backgroundColor: Colors.white,
  marginVertical: 5,
  alignContent: 'flex-start',
});

export const GSTitle = glamor(GSCustomText)({
  alignSelf: 'center',
  fontSize: 20,
  marginVertical: 20,
  textAlign: 'left',
});
