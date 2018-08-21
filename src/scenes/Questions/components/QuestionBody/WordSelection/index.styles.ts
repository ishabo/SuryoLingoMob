import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { GSCustomText, ICustomText, GSCustomStudyText } from 'styles/text';

interface IWordProps extends ICustomText {
  shadowed?: boolean;
  selected?: boolean;
}

export const GSWordBox = glamor.view({
  margin: 5
});

export const GSWordText = glamor(GSCustomStudyText)<IWordProps>(
  {
    alignSelf: 'stretch',
    padding: 10
  },
  props => ({
    color: props.shadowed ? Colors.darkGray : Colors.black,
    backgroundColor: props.shadowed ? Colors.darkGray : Colors[props.selected ? 'lightGray' : 'white']
  })
);

export const GSSelectionBox = glamor.view({
  alignContent: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
  height: 120
});

export const GSAnswerBox = glamor.view({
  padding: 10,
  minHeight: 120,
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginVertical: 5,
  alignContent: 'flex-start',
  backgroundColor: '#E8E8E8'
});

export const GSTitle = glamor(GSCustomText)<ICustomText>({
  alignSelf: 'center',
  fontSize: 18,
  marginVertical: 10,
  textAlign: 'left'
});
