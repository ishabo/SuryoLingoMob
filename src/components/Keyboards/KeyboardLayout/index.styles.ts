import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { Icon } from 'native-base';
import { GSCustomText, ICustomText } from 'styles/text';
import { isNarrowDevice } from 'helpers';

export const GSContainer = glamor.view({
  marginTop: 20,
  backgroundColor: 'white'
});

const textStyle = {
  textAlign: 'center',
  alignSelf: 'center',
  color: Colors.white,
  fontSize: 20
};

export const GSKeyText = glamor(GSCustomText)<ICustomText>({
  ...textStyle
});

export const GSIcon = glamor(Icon)({
  ...textStyle,
  alignSelf: 'center',
  marginLeft: 10,
  fontSize: 25,
  width: 40,
  transform: [{ rotate: '180deg' }]
});

export const GSContent = glamor.view<{ spread?: boolean }>(
  {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  ({ spread }) => ({
    justifyContent: spread ? 'space-between' : 'flex-start',
    alignSelf: spread ? 'stretch' : 'center'
  })
);

export const GSButton = glamor.touchableOpacity<{ onPress: () => void }>({
  width: 78,
  height: isNarrowDevice() ? 28 : 32,
  margin: 1,
  borderRadius: 4,
  backgroundColor: '#1373E4',
  alignContent: 'stretch',
  alignSelf: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: { width: -2, height: 3 },
  shadowOpacity: 0.6,
  shadowRadius: 2,
  elevation: 2
});

export const GSReturnKey = glamor(GSButton)({});

export const GSKey = glamor(GSButton)({
  width: isNarrowDevice() ? 23 : 26
});

export const GSBackSpaceKey = glamor(GSButton)({
  width: 54,
  alignItems: 'center'
});

export const GSSpaceKey = glamor(GSButton)({
  width: 220,
  alignSelf: 'center'
});
