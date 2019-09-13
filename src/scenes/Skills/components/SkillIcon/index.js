import * as React from 'react';
import { connect } from 'react-redux';
import glamor from 'glamorous-native';
import { getSkillIcon } from 'services/selectors';
const GSIcon = glamor.image({
    alignSelf: 'center'
}, props => ({
    width: props.size || 100,
    height: props.size || 100
}));
const mapStateToProps = (state) => ({
    getSkillIcon: getSkillIcon(state)
});
const sizes = {
    hdpi: 50,
    xhdpi: 88,
    xxhdpi: 100,
    xxxhdpi: 130
};
export default connect(mapStateToProps)(({ icon, size = 'xhdpi', getSkillIcon, state = 'unlocked' }) => (React.createElement(GSIcon, { source: { uri: 'data:image/png;base64,' + getSkillIcon(icon, size)[state] }, size: sizes[size] })));
//# sourceMappingURL=index.js.map