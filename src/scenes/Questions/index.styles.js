import glamor from 'glamorous-native';
import { Icon, Container } from 'native-base';
import { Platform } from 'react-native';
export const GSProgress = glamor.view({
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: Platform.OS === 'android' ? 15 : 25
});
GSProgress.displayName = 'GSProgress';
export const GSIcon = glamor(Icon)({
    position: 'absolute',
    top: Platform.select({ android: 0, ios: 5 }),
    left: Platform.select({ android: 10, ios: 15 }),
    fontSize: Platform.select({ android: 40, ios: 50 }),
    alignSelf: 'center'
});
GSIcon.displayName = 'GSIcon';
export const GSFooterAndBody = glamor.view({
    flex: 1,
    justifyContent: 'space-between'
});
export const GSContainer = glamor(Container)({});
GSContainer.displayName = 'GSContainer';
//# sourceMappingURL=index.styles.js.map