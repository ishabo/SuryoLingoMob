import * as React from 'react';
import { connect } from 'react-redux';
import { IInitialState } from '@sl/services/reducers';
import { isRegistered, getSourceLanguage } from '@sl/services/selectors';
import { NavigationActions, NavigationResetActionPayload } from 'react-navigation';
import { Dispatch } from 'redux';
import { resetToSignon } from '@sl/helpers/navigation';
import * as signon from '@sl/services/signon';
import { Analytics } from '@sl/config/firebase';
import I18n from '@sl/i18n';
import { GSCustomText, ICustomText } from '@sl/styles/text';
import glamor from 'glamorous-native';
import Colors from '@sl/styles/colors';
import { Text } from 'react-native';
import { Alert } from 'react-native';

interface IProps {
  isLoggedIn: boolean;
  navigationReset: (reset: NavigationResetActionPayload) => void;
  sourceLanguage: TLangs;
  signOut(): void;
  noStyle?: boolean;
}

const areYouSure = func => {
  Alert.alert(
    I18n.t('signon.alerts.signOut.title'),
    I18n.t('signon.alerts.signOut.description'),
    [
      {
        text: I18n.t('signon.alerts.signOut.cancel'),
        onPress: () => {
          Analytics.logEvent('signout_cancelled');
        },
        style: 'cancel'
      },
      { text: I18n.t('signon.alerts.signOut.ok'), onPress: func }
    ],
    { cancelable: false }
  );
};

const SignInOrOut = ({ isLoggedIn, navigationReset, sourceLanguage, signOut, noStyle }: IProps) => {
  const onPress = isLoggedIn ? () => areYouSure(signOut) : () => navigationReset(resetToSignon());
  const text = isLoggedIn ? I18n.t('signon.form.signOut') : I18n.t('signon.form.signonToSave');
  return (
    (noStyle && <Text onPress={onPress}>{text}</Text>) || (
      <GSText onPress={onPress} lang={sourceLanguage}>
        {text}
      </GSText>
    )
  );
};

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  isLoggedIn: isRegistered(state),
  sourceLanguage: getSourceLanguage(state)
});

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  navigationReset: (reset: NavigationResetActionPayload) => dispatch(NavigationActions.reset(reset)),
  signOut: () => dispatch(signon.actions.signout())
});

const GSText = glamor(GSCustomText)<ICustomText>({
  fontSize: 14,
  marginHorizontal: 10,
  fontWeight: '600',
  color: Colors.darkBlue,
  alignSelf: 'center'
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInOrOut);
