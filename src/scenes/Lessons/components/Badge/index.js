import React from 'react';
import { GSBadge, GSBadgeRibbon140, GSBadgeRibbonCircle, GSBadgeRubbonNeg140 } from './index.styles';
export default (props) => (React.createElement(GSBadge, { style: props.style },
    React.createElement(GSBadgeRubbonNeg140, null),
    React.createElement(GSBadgeRibbon140, null),
    React.createElement(GSBadgeRibbonCircle, null, props.children)));
//# sourceMappingURL=index.js.map