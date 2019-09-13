import React from 'react';
import glamor from 'glamorous-native';
import Images from 'assets/images';
import { GSCustomText } from 'styles/text';
import colors from 'styles/colors';
export const GSDrawerLabel = glamor.view({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
});
export const GSDrawerLabelText = glamor(GSCustomText)({
    fontSize: 18,
    color: colors.orange,
    margin: 10,
    padding: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
});
const GSImage = glamor.image({
    width: 40,
    height: 40
});
export default ({ label, icon }) => (React.createElement(GSDrawerLabel, null,
    React.createElement(GSImage, { source: Images.icons[icon] }),
    React.createElement(GSDrawerLabelText, null, label)));
//# sourceMappingURL=index.js.map