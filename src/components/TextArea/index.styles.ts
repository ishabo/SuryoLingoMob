import { Container, Button } from 'native-base';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { isShortDevice } from 'helpers';
import { getFont } from 'assets/fonts';
import { TouchableOpacity } from 'react-native';
// import { TextInput } from 'react-native-custom-keyboard';

export const GSContainer = glamor(Container)({
  alignSelf: 'stretch'
});

export const GSContent = glamor.view({
  justifyContent: 'flex-start',
  flex: 1
});

export const GSTextAreaContainer = glamor.view({
  height: isShortDevice() ? 80 : 80,
  marginBottom: 2,
  borderWidth: 1,
  borderColor: Colors.white,
  padding: 3
});

export const GSFakeTextArea = glamor(TouchableOpacity as any)({
  flex: 1,
  alignItems: 'flex-start',
  flexDirection: 'row',
  padding: 10,
  backgroundColor: '#d9d9d9',
  position: 'relative'
}) as any;

export const GSTextArea = glamor.textInput(
  {
    height: 0,
    position: 'absolute',
    top: -99999999,
    textAlign: 'right',
    backgroundColor: Colors.lightGray,
    textAlignVertical: 'top'
  },
  props => {
    const styles = {
      fontFamily: props.lang === 'cl-ara' ? 'Arial' : getFont(props.lang, 'regular')
    };
    if (props.rtl !== null) {
      styles['writingDirection'] = 'rtl';
    }
    return styles;
  }
) as any;

export const GSKeyboardToolBar = glamor.view({
  justifyContent: 'flex-end',
  backgroundColor: 'white',
  padding: 4,
  flexDirection: 'row'
});

export const GSKeyboardCloseButton = glamor(Button)({
  width: 30,
  height: 34,
  margin: 2
});

export const GSKeyboardToggleButton = glamor(Button)({
  width: 64,
  height: 34,
  margin: 2
});
