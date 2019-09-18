import glamor from 'glamorous-native';
import Colors from '@sl/styles/colors';
import { GSCustomText, ICustomText, GSCustomStudyText } from '@sl/styles/text';

interface IWordProps extends ICustomText {
  shadowed?: boolean;
  selected?: boolean;
}

export const GSWordBox = glamor.view({
  margin: 5,
  backgroundColor: Colors.lightGray
});
GSWordBox.displayName = 'GSWordBox';

export const GSWordText = glamor(GSCustomStudyText)<IWordProps>(
  {
    alignSelf: 'stretch',
    padding: 10
  },
  props => ({
    color: props.shadowed ? Colors.darkGray : Colors.black,
    backgroundColor: props.shadowed ? Colors.darkGray : Colors.lightGray
  })
);
GSWordText.displayName = 'GSWordText';

export const GSSelectionBox = glamor.view({
  alignContent: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap'
});
GSSelectionBox.displayName = 'GSSelectionBox';

export const GSAnswerBox = glamor.view({
  padding: 10,
  minHeight: 80,
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginVertical: 5,
  backgroundColor: '#E8E8E8'
});
GSAnswerBox.displayName = 'GSAnswerBox';

export const GSTitle = glamor(GSCustomText)<ICustomText>({
  alignSelf: 'center',
  fontSize: 18,
  marginVertical: 10,
  textAlign: 'left'
});
GSTitle.displayName = 'GSTitle';
