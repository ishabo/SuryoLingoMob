import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { isNarrowDevice } from 'helpers';
import { GSCustomText } from 'styles/text';

const height = 120;

export const GSBannerHeader = glamor(GSCustomText)({
  color: Colors.white,
  alignSelf: 'flex-start',
  fontSize: 26,
  fontWeight: '800',
});

export const GSBanner = glamor.view({
  height,
  left: 0,
  bottom: 100,
  flexDirection: 'row',
  position: 'absolute',
  zIndex: 100,
});

export const GSBannerText = glamor(GSCustomText)({
  color: Colors.white,
  alignSelf: 'flex-start',
  fontSize: 16,
});

export const GSBoldText = glamor(GSBannerText)({
  fontWeight: '900',
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

export const GSMessageText = glamor.view({
});

export const GSTriangle = glamor.view<{ color: string, upsideDown?: boolean }>(
  {
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
  },
  props => ({
    borderBottomColor: props.color,
    transform: [{ rotate: props.upsideDown ? '180deg' : '0deg' }],
  }),
);
