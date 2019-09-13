import React from 'react';
import glamor from 'glamorous-native';
import { Icon } from 'native-base';
export default ({ onPress }) => (React.createElement(GSBars, { onPress: onPress },
    React.createElement(Icon, { type: "FontAwesome", name: "bars" })));
const GSBars = glamor.touchableOpacity({
    width: 50,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
});
//# sourceMappingURL=index.js.map