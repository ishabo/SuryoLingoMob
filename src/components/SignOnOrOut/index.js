import * as React from 'react';
import { connect } from 'react-redux';
import { isRegistered, getSourceLanguage } from 'services/selectors';
import { NavigationActions } from 'react-navigation';
import { resetToSignon } from 'helpers/navigation';
import * as signon from 'services/signon';
import { Analytics } from 'config/firebase';
import I18n from 'I18n';
import { GSCustomText } from 'styles/text';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { Text } from 'react-native';
import { Alert } from 'react-native';
const areYouSure = func => {
    Alert.alert(I18n.t('signon.alerts.signOut.title'), I18n.t('signon.alerts.signOut.description'), [
        {
            text: I18n.t('signon.alerts.signOut.cancel'),
            onPress: () => {
                Analytics.logEvent('signout_cancelled');
            },
            style: 'cancel'
        },
        { text: I18n.t('signon.alerts.signOut.ok'), onPress: func }
    ], { cancelable: false });
};
const SignInOrOut = ({ isLoggedIn, navigationReset, sourceLanguage, signOut, noStyle }) => {
    const onPress = isLoggedIn ? () => areYouSure(signOut) : () => navigationReset(resetToSignon());
    const text = isLoggedIn ? I18n.t('signon.form.signOut') : I18n.t('signon.form.signonToSave');
    return ((noStyle && React.createElement(Text, { onPress: onPress }, text)) || (React.createElement(GSText, { onPress: onPress, lang: sourceLanguage }, text)));
};
const mapStateToProps = (state) => ({
    isLoggedIn: isRegistered(state),
    sourceLanguage: getSourceLanguage(state)
});
const mapDispatchToProps = (dispatch) => ({
    navigationReset: (reset) => dispatch(NavigationActions.reset(reset)),
    signOut: () => dispatch(signon.actions.signout())
});
const GSText = glamor(GSCustomText)({
    fontSize: 14,
    marginHorizontal: 10,
    fontWeight: '600',
    color: Colors.darkBlue,
    alignSelf: 'center'
});
export default connect(mapStateToProps, mapDispatchToProps)(SignInOrOut);
//# sourceMappingURL=index.js.map