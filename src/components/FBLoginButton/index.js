import React, { Component } from 'react';
import { connect } from 'react-redux';
import glamor from 'glamorous-native';
import I18n from 'I18n';
import { Button, Icon } from 'native-base';
import { connectViaFacebook } from 'services/signon/actions';
import { calcWindowWidth } from 'helpers';
import Colors from 'styles/colors';
import { GSCustomText } from 'styles/text';
const GSButtonText = glamor(GSCustomText)({
    alignSelf: 'center',
    color: Colors.white,
    textAlign: 'center',
    flexDirection: 'row',
    fontSize: 14,
    marginLeft: 5
});
const GSButton = glamor(Button)({
    width: calcWindowWidth(10),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.facebook
});
class FBLoginButton extends Component {
    render() {
        const connectViaFacebookText = `${this.props.signon}ViaFacebook`;
        return (React.createElement(GSButton, { iconLeft: true, rounded: true, onPress: () => this.props.connectViaFacebook(this.props.signon) },
            React.createElement(GSButtonText, null, I18n.t(`signon.form.${connectViaFacebookText}`)),
            React.createElement(Icon, { name: "facebook", type: "Entypo" })));
    }
}
const mapDispatchToProps = {
    connectViaFacebook
};
export default connect(null, mapDispatchToProps)(FBLoginButton);
//# sourceMappingURL=index.js.map