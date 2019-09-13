import * as React from 'react';
import { Text, Icon } from 'native-base';
import glamor from 'glamorous-native';
const GSTouchable = glamor.touchableOpacity({
    width: 100,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
});
export default ({ title, navigate }) => (title && (React.createElement(GSTouchable, { onPress: () => navigate() },
    React.createElement(Icon, { name: "list" }),
    React.createElement(Text, null, title)))) || React.createElement(Text, null);
//# sourceMappingURL=index.js.map