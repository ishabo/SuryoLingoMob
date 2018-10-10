import glamor from 'glamorous-native';
import Colors from 'styles/colors';

export const GSBadge = glamor.view({
  width: 80
});
GSBadge.displayName = 'GSBadge';

export const GSBadgeRibbonCircle = glamor.view({
  width: 80,
  height: 80,
  backgroundColor: Colors.lightGreen,
  borderRadius: 50
});
GSBadgeRibbonCircle.displayName = 'GSBadgeRibbonCircle';

const GSBadgeRibbon = glamor.view({
  backgroundColor: 'transparent',
  borderBottomWidth: 60,
  borderBottomColor: Colors.lightGreen,
  borderLeftWidth: 30,
  borderLeftColor: 'transparent',
  borderRightWidth: 30,
  borderRightColor: 'transparent',
  position: 'absolute',
  top: 57
});
GSBadgeRibbon.displayName = 'GSBadgeRibbon';

export const GSBadgeRibbon140 = glamor(GSBadgeRibbon)({
  left: -7,
  transform: [{ rotate: '140deg' }]
});
GSBadgeRibbon140.displayName = 'GSBadgeRibbon140';

export const GSBadgeRubbonNeg140 = glamor(GSBadgeRibbon)({
  right: -7,
  transform: [{ rotate: '-140deg' }]
});
GSBadgeRubbonNeg140.displayName = 'GSBadgeRubbonNeg140';
