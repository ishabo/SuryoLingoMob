import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { isNarrowDevice, scaleSize } from 'helpers';
import { GSCustomText } from 'styles/text';
const height = 120;
export const GSBanner = glamor.view({
    height,
    left: 0,
    bottom: 100,
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 100,
});
export const GSBannerHeader = glamor(GSCustomText)({
    color: Colors.white,
    alignSelf: 'flex-start',
    fontSize: scaleSize(26, 22),
});
export const GSBannerText = glamor(GSCustomText)({
    color: Colors.white,
    alignSelf: 'flex-start',
    fontSize: scaleSize(16, 14),
});
export const GSBoldText = glamor(GSBannerText)({
    fontSize: scaleSize(16, 14),
});
export const GSBannerTail = glamor.view({
    width: 100,
    marginLeft: -25,
});
export const GSMessageBox = glamor.view({
    height,
    width: isNarrowDevice() ? 230 : 270,
    padding: 15,
    alignContent: 'flex-start',
});
export const GSMessageText = glamor.view({});
export const GSTriangle = glamor.view({
    position: 'absolute',
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: height,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
}, props => ({
    borderBottomColor: props.color,
    transform: [{ rotate: props.upsideDown ? '180deg' : '0deg' }],
}));
//# sourceMappingURL=index.styles.js.map