import React from 'react';
import glamor from 'glamorous-native';
import Colors from '../../../../styles/colors';

export default (props: any) => <GSBadge style={props.style}>

  <GSBadgeRubbonNeg140 />
  <GSBadgeRibbon140 />
  <GSBadgeRibbonCircle >
    {props.children}
  </GSBadgeRibbonCircle>
</GSBadge>;

const GSBadge = glamor.view({
  width: 100,
});

const GSBadgeRibbonCircle = glamor.view({
  width: 100,
  height: 100,
  backgroundColor: Colors.green,
  borderRadius: 50,
});

const GSBadgeRibbon = glamor.view({
  backgroundColor: 'transparent',
  borderBottomWidth: 70,
  borderBottomColor: Colors.green,
  borderLeftWidth: 40,
  borderLeftColor: 'transparent',
  borderRightWidth: 40,
  borderRightColor: 'transparent',
  position: 'absolute',
  top: 70,
});

const GSBadgeRibbon140 = glamor(GSBadgeRibbon)({
  left: -10,
  transform: [
    { rotate: '140deg' },
  ],
});

const GSBadgeRubbonNeg140 = glamor(GSBadgeRibbon)({
  right: -10,
  transform: [
    { rotate: '-140deg' },
  ],
});
