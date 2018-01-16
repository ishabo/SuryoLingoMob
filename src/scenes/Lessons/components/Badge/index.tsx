import React from 'react';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';

export default (props: any) =>
  <GSBadge style={props.style}>
    <GSBadgeRubbonNeg140 />
    <GSBadgeRibbon140 />
    <GSBadgeRibbonCircle >
      {props.children}
    </GSBadgeRibbonCircle>
  </GSBadge>;

const GSBadge = glamor.view({
  width: 80,
});

const GSBadgeRibbonCircle = glamor.view({
  width: 80,
  height: 80,
  backgroundColor: Colors.green,
  borderRadius: 50,
});

const GSBadgeRibbon = glamor.view({
  backgroundColor: 'transparent',
  borderBottomWidth: 60,
  borderBottomColor: Colors.green,
  borderLeftWidth: 30,
  borderLeftColor: 'transparent',
  borderRightWidth: 30,
  borderRightColor: 'transparent',
  position: 'absolute',
  top: 57,
});

const GSBadgeRibbon140 = glamor(GSBadgeRibbon)({
  left: -7,
  transform: [
    { rotate: '140deg' },
  ],
});

const GSBadgeRubbonNeg140 = glamor(GSBadgeRibbon)({
  right: -7,
  transform: [
    { rotate: '-140deg' },
  ],
});
