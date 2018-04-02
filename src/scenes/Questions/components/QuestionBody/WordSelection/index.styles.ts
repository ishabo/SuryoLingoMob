import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { GSCustomText } from 'styles/text';

interface IWordProps {
  shadowed?: boolean;
  selected?: boolean;
}

export const GSWordBox: any = glamor.view({
  // height: 40,
  margin: 5
});

export const GSWordText: any = glamor(GSCustomText)<IWordProps>(
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

export const GSSelectionBox: any = glamor.view({
  alignContent: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
  height: 120,
});

export const GSAnswerBox: any = glamor.view({
  padding: 10,
  minHeight: 120,
  flexDirection: 'row',
  flexWrap: 'wrap',
  backgroundColor: Colors.white,
  marginVertical: 5,
  alignContent: 'flex-start',
});

export const GSTitle: any = glamor(GSCustomText)({
  alignSelf: 'center',
  fontSize: 18,
  marginVertical: 10,
  textAlign: 'left',
});
