import { Container } from 'native-base';
import glamor from 'glamorous-native';
export const GSContainer = glamor(Container)({
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
});
GSContainer.displayName = 'GSContainer';
export const GSLogo = glamor.image({
    width: 300,
    height: 295
});
GSLogo.displayName = 'GSLogo';
export const GSVersion = glamor.text({
    fontSize: 18,
    marginTop: 10,
    alignItems: 'center'
});
GSVersion.displayName = 'GSVersion';
//# sourceMappingURL=index.styles.js.map