import {
  Container,
  Input,
} from 'native-base';

import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { isShortDevice } from 'helpers';
import { getFont } from 'assets/fonts';

export const GSContainer: any = glamor(Container)({
  alignSelf: 'stretch',
});

export const GSContent: any = glamor.view({
  justifyContent: 'flex-start',
  flex: 1,
});

export const GSTextAreaContainer: any = glamor.view({
  height: isShortDevice() ? 80 : 115,
  marginBottom: 5,
  borderWidth: 1,
  borderColor: Colors.white,
  padding: 3,
});

export const GSTextArea: any = glamor(Input)<{ rtl: boolean; lang: TLangs; }>(
  {
    textAlign: 'right',
    backgroundColor: Colors.lightGray,
    textAlignVertical: 'top',
  },
  (props) => {
    const styles = {
      fontFamily: getFont(props.lang, 'regular'),
    };

    if (props.rtl !== null) {
      styles['writingDirection'] = 'rtl';
    }

    return styles;
  },
);
