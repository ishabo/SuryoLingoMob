import * as React from 'react';
import { Button } from 'native-base';
import glamor from 'glamorous-native';
import { GSCustomText } from 'styles/text';
export default (props) => (React.createElement(GSSwitchButton, Object.assign({ rounded: true }, props),
    React.createElement(GSCustomText, { lang: props.lang }, props.text)));
const GSSwitchButton = glamor(Button)({
    paddingVertical: 0,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    height: 40,
    alignItems: 'center'
});
//# sourceMappingURL=index.js.map