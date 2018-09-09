import { Button, Icon } from 'native-base';
import { Container } from 'native-base';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
export * from 'styles/forms';
export * from 'styles/text';

export const GSContainer = glamor(Container)({
  backgroundColor: Colors.white,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}) as any;

export const GSLink = glamor.touchableOpacity({
  alignSelf: 'center',
  marginTop: 10,
  padding: 10
});

export const GSTabs = glamor.view({
  flexDirection: 'row',
  alignSelf: 'center',
  marginTop: 10,
  marginBottom: 20
});

export const GSTabButton = glamor(Button)({
  paddingHorizontal: 6,
  width: 170,
  alignSelf: 'center'
});

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

export const GSSeparator = glamor.view<{ margin?: number; blank?: boolean }>(
  {
    alignSelf: 'stretch',
    borderBottomColor: Colors.gray,
    position: 'relative'
  },
  ({ blank, margin }) => ({
    borderBottomWidth: blank ? 0 : 1,
    margin: margin ? margin : 30
  })
);

export const GSSeperatorText = glamor.text({
  padding: 5,
  alignSelf: 'center',
  backgroundColor: Colors.white,
  position: 'absolute',
  top: -13
});
