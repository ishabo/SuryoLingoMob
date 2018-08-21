import { Container, Input, Button } from 'native-base';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { isShortDevice } from 'helpers';
import { getFont } from 'assets/fonts';
// import { TextInput } from 'react-native-custom-keyboard';

export const GSContainer = glamor(Container)({
  alignSelf: 'stretch'
});

export const GSContent = glamor.view({
  justifyContent: 'flex-start',
  flex: 1
});

export const GSTextAreaContainer = glamor.view({
  height: isShortDevice() ? 80 : 115,
  marginBottom: 5,
  borderWidth: 1,
  borderColor: Colors.white,
  padding: 3
});

export const GSTextArea = glamor(Input as any)(
  {
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
  padding: 8,
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
