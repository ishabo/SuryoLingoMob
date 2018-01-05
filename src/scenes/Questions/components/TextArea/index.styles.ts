import {
  Container,
  Input,
} from 'native-base';

import glamor from 'glamorous-native';
import Colors from 'styles/colors';

export const GSContainer = glamor(Container)({
  alignSelf: 'stretch',
});

export const GSContent = glamor.view({
  marginTop: 10,
  justifyContent: 'flex-start',
  flex: 1,
});

export const GSTextAreaContainer = glamor.view({
  height: 115,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: Colors.gray,
  padding: 5,
});

export const GSTextArea = glamor(Input)<{ rtl: boolean }>(
  {
    textAlign: 'right',
    backgroundColor: Colors.lightGray,
    textAlignVertical: 'top',
  },
  (props) => {
    return (props.rtl) ? {
      writingDirection: 'rtl',
    } : {};
  },
);
