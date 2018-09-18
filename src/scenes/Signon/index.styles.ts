import { Button, Container, Icon } from 'native-base';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { SafeAreaView, Platform } from 'react-native';
export * from 'styles/forms';
export * from 'styles/text';

const AreaView = Platform.OS === 'ios' ? SafeAreaView : Container;

export const GSContainer = glamor(AreaView as any)({
  backgroundColor: Colors.white,
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  flex: 1
}) as any;

export const GSContent = glamor.view({
  alignSelf: 'stretch',
  flex: 1,
  padding: 10,
  paddingTop: 0
});

export const GSLink = glamor.touchableOpacity({
  alignSelf: 'center',
  marginTop: 5,
  padding: 10
});

export const GSTabs = glamor.view({
  flexDirection: 'row',
  alignSelf: 'center',
  marginHorizontal: 16,
  marginBottom: 20
});

export const GSTabButton = glamor(Button)<{ selected: boolean }>(
  {
    paddingHorizontal: 6,
    width: 170,
    alignSelf: 'center'
  },
  ({ selected }) => ({
    backgroundColor: selected ? Colors.lightBlue : Colors.whiteSmoke,
    color: selected ? Colors.gray : Colors.snow
  })
);

export const GSButtonText = glamor.text<{ color: string; large: boolean }>(
  {
    alignSelf: 'center'
  },
  props => ({
    color: props.color,
    fontSize: props.large ? 18 : 12
  })
);

export const GSIcon = glamor(Icon)({
  position: 'absolute',
  right: 15,
  top: 10,
  fontSize: 20,
  color: Colors.black,
  zIndex: 100
});

export const GSFooter = glamor.view({
  backgroundColor: 'transparent',
  justifyContent: 'flex-end',
  marginBottom: 12
});

export const GSError = glamor.text({
  color: Colors.red
});

export const GSDescription = glamor.text({
  textAlign: 'center',
  fontSize: 18,
  paddingVertical: 10
});

export const GSSeparator = glamor.view<{ margin?: number }>(
  {
    height: 40,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    position: 'relative'
  },
  ({ margin }) => ({
    marginVertical: margin ? margin : 40
  })
);

export const GSSeperatorLine = glamor.view({
  borderBottomColor: Colors.lightBlue,
  borderBottomWidth: 1,
  alignSelf: 'stretch',
  height: 1
});

export const GSSeperatorText = glamor.text({
  paddingVertical: 10,
  paddingHorizontal: 10,
  height: 40,
  alignSelf: 'center',
  backgroundColor: Colors.snow,
  position: 'absolute',
  top: 0
});
