import glamor from 'glamorous-native';
import Colors from '../../styles/colors';
const height = 140;

export const GSBannerHeader = glamor.text({
    color: Colors.white,
    writingDirection: 'rtl',
    alignSelf: 'flex-start',
    marginBottom: 10,
    fontSize: 30,
    fontWeight: '800',
});

export const GSBanner = glamor.view({
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    bottom: 100,
    height,
})
export const GSBannerText = glamor.text({
    color: Colors.white,
    writingDirection: 'rtl',
    alignSelf: 'flex-start',
    fontSize: 18,
});

export const GSBoldText = glamor(GSBannerText)({
    fontWeight: '900'
});

export const GSBannerTail = glamor.view({
    width: 100,
})

export const GSMessageBox = glamor.view({
    width: 250,
    marginLeft: - 25,
    padding: 20,
    height,
    alignContent: 'flex-start',
});

export const GSMessageText = glamor.view({
    marginLeft: -40
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