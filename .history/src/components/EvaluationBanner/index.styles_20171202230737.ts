import glamor from 'glamorous-native';
import Colors from '../../styles/colors';

const height = 140;

export const GSBannerHeader = glamor.text({
  color: Colors.white,
  alignSelf: 'flex-start',
  marginBottom: 10,
  fontSize: 30,
  fontWeight: '800',
});

export const GSBanner = glamor.view({
  height,
  left: 0,
  bottom: 100,
  flexDirection: 'row',
  position: 'absolute',
});

export const GSBannerText = glamor.text({
  color: Colors.white,
  alignSelf: 'flex-start',
  fontSize: 16,
});

export const GSBoldText = glamor(GSBannerText)({
  fontWeight: '900'
});

export const GSBannerTail = glamor.view({
  width: 100,
  marginLeft: -25
})

export const GSMessageBox = glamor.view({
  width: 270,
  padding: 15,
  height,
  alignContent: 'flex-start',
});

export const GSMessageText = glamor.view({
});

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
}, (props: { color: string, upsideDown?: boolean }) => ({
  borderBottomColor: props.color,
  transform: [{ rotate: props.upsideDown ? '180deg' : '0deg' }]
}));