import { Button, Container, Icon } from 'native-base';
import glamor from 'glamorous-native';
import Colors from '@sl/styles/colors';
import { SafeAreaView, Platform } from 'react-native';
export * from '@sl/styles/forms';
export * from '@sl/styles/text';

const AreaView = Platform.OS === 'ios' ? SafeAreaView : Container;

export const GSContainer = glamor(AreaView as any)({
  backgroundColor: Colors.white,
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  flex: 1
}) as any;
GSContainer.displayName = 'GSContainer';

export const GSContent = glamor.view({
  alignSelf: 'stretch',
  flex: 1,
  padding: 10,
  paddingTop: 0
});
GSContent.displayName = 'GSContent';

export const GSLink = glamor.touchableOpacity({
  alignSelf: 'center',
  marginTop: 5,
  padding: 10
});
GSLink.displayName = 'GSLink';

export const GSTabs = glamor.view({
  flexDirection: 'row',
  alignSelf: 'center',
  marginHorizontal: 16,
  marginBottom: 20
});
GSTabs.displayName = 'GSTabs';

export const GSTabButton = glamor(Button)<{ selected: boolean }>(
  {
    paddingHorizontal: 6,
    width: 170,
    alignSelf: 'center'
  },
  ({ selected }) => ({
    backgroundColor: selected ? Colors.lightBlue : Colors.whiteSmoke
  })
);
GSTabButton.displayName = 'GSTabButton';

export const GSButtonText = glamor.text<{ color: string; large: boolean }>(
  {
    alignSelf: 'center'
  },
  props => ({
    color: props.color,
    fontSize: props.large ? 18 : 12
  })
);
GSButtonText.displayName = 'GSButtonText';

export const GSIcon = glamor(Icon)({
  position: 'absolute',
  right: 15,
  top: 10,
  fontSize: 20,
  color: Colors.black,
  zIndex: 100
});
GSIcon.displayName = 'GSIcon';

export const GSFooter = glamor.view({
  backgroundColor: 'transparent',
  justifyContent: 'flex-end',
  marginBottom: 12
});
GSFooter.displayName = 'GSFooter';

export const GSError = glamor.text({
  color: Colors.red
});
GSError.displayName = 'GSError';

export const GSDescription = glamor.text({
  textAlign: 'center',
  fontSize: 18,
  paddingVertical: 10
});
GSDescription.displayName = 'GSDescription';

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
GSSeparator.displayName = 'GSSeparator';

export const GSSeperatorLine = glamor.view({
  borderBottomColor: Colors.lightBlue,
  borderBottomWidth: 1,
  alignSelf: 'stretch',
  height: 1
});
GSSeperatorLine.displayName = 'GSSeperatorLine';

export const GSSeperatorText = glamor.text({
  paddingVertical: 10,
  paddingHorizontal: 10,
  height: 40,
  alignSelf: 'center',
  backgroundColor: Colors.snow,
  position: 'absolute',
  top: 0
});
GSSeperatorText.displayName = 'GSSeperatorText';
